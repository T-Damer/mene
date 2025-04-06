import HorizontalDates from '@/components//Calendar/HorizontalDates'
import LogPeriodModal from '@/components/Modals/LogPeriodModal'
import { useCycleTracker } from '@/hooks/useCycleTracking'
import { format } from 'date-fns'
import { useState } from 'react'

export default function MainTimeline() {
  const {
    cycleData,
    logPeriod,
    endPeriod,
    isLate,
    daysLate,
    periodPrediction,
  } = useCycleTracker()

  const [showPeriodModal, setShowPeriodModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const ongoingPeriod = cycleData.cycles.find((cycle) => !cycle.endDate)

  const getCyclePhase = () => {
    const today = new Date()

    if (ongoingPeriod) return 'Period'

    if (isLate) return 'Late'

    const { fertileWindowStart, fertileWindowEnd, ovulationDate } =
      cycleData.calculations

    if (today >= fertileWindowStart && today <= fertileWindowEnd) {
      if (today.getTime() === ovulationDate.getTime()) {
        return 'Ovulation'
      }
      return 'Fertile Window'
    }

    // If after ovulation but before next period
    if (today > fertileWindowEnd && today < periodPrediction.nextPeriodDate) {
      return 'Luteal Phase'
    }

    // If after last period ended but before fertile window
    return 'Follicular Phase'
  }

  // Format predictions for display
  const formatPredictionText = () => {
    if (isLate) {
      return `Period is ${daysLate} day${daysLate !== 1 ? 's' : ''} late`
    }

    const daysUntilPeriod = Math.round(
      (periodPrediction.nextPeriodDate.getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )

    return `Period in ${daysUntilPeriod} day${daysUntilPeriod !== 1 ? 's' : ''}`
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleLogPeriod = () => {
    if (ongoingPeriod) {
      endPeriod(selectedDate)
    } else {
      logPeriod(selectedDate)
    }
    setShowPeriodModal(false)
  }

  return (
    <div className="cycle-tracking-screen p-4">
      <div className="cycle-status mb-6">
        <h2 className="text-2xl font-bold">{getCyclePhase()}</h2>
        <p className="text-gray-600">{formatPredictionText()}</p>
      </div>

      <div className="calendar-section mb-8">
        <h3 className="text-lg font-semibold mb-2">Your Cycle</h3>
        <HorizontalDates onDateSelect={handleDateSelect} />
      </div>

      <div className="predictions">
        <h3 className="text-lg font-semibold mb-2">Predictions</h3>
        <div className="prediction-card bg-gray-50 p-4 rounded-lg mb-3">
          <div className="font-medium">Next Period</div>
          <div>{format(periodPrediction.nextPeriodDate, 'MMM d, yyyy')}</div>
        </div>

        <div className="prediction-card bg-blue-50 p-4 rounded-lg mb-3">
          <div className="font-medium">Fertile Window</div>
          <div>
            {format(periodPrediction.fertile.start, 'MMM d')} -{' '}
            {format(periodPrediction.fertile.end, 'MMM d, yyyy')}
          </div>
        </div>

        <div className="prediction-card bg-blue-100 p-4 rounded-lg">
          <div className="font-medium">Ovulation</div>
          <div>{format(periodPrediction.ovulation, 'MMM d, yyyy')}</div>
        </div>
      </div>

      <LogPeriodModal
        isOpen={showPeriodModal}
        title={ongoingPeriod ? 'End Period' : 'Start Period'}
        description={`Selected date: ${format(selectedDate, 'MMMM d, yyyy')}`}
        trigger={
          <div className="mb-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full"
              onClick={() => setShowPeriodModal(true)}
            >
              {ongoingPeriod ? 'End Period' : 'Log Period'}
            </button>
          </div>
        }
        onSubmit={handleLogPeriod}
        submitText={ongoingPeriod ? 'End Period' : 'Start Period'}
        onCancel={() => setShowPeriodModal(false)}
      />
    </div>
  )
}

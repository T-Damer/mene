'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useCycleTracker } from '@/hooks/useCycleTracking'

interface PeriodEditModalProps {
  isOpen: boolean
  onClose: () => void
  cycleIndex: number
}

type Intensity = 'light' | 'medium' | 'heavy'

const availableSymptoms = [
  'Cramps',
  'Headache',
  'Backache',
  'Fatigue',
  'Bloating',
  'Mood Swings',
  'Acne',
  'Breast Tenderness',
]

export default function PeriodEditModal({
  isOpen,
  onClose,
  cycleIndex,
}: PeriodEditModalProps) {
  const { cycleData, editPeriod, deletePeriod } = useCycleTracker()

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [flowIntensity, setFlowIntensity] = useState<Intensity>('medium')
  const [symptoms, setSymptoms] = useState<string[]>([])

  useEffect(() => {
    if (isOpen && cycleIndex >= 0 && cycleIndex < cycleData.cycles.length) {
      const cycle = cycleData.cycles[cycleIndex]
      setStartDate(cycle.startDate)
      setEndDate(cycle.endDate)
      setFlowIntensity(cycle.flowIntensity || 'medium')
      setSymptoms(cycle.symptoms || [])
    }
  }, [isOpen, cycleIndex, cycleData.cycles])

  const handleSave = () => {
    editPeriod(cycleIndex, startDate, endDate, flowIntensity, symptoms)
    onClose()
  }

  const handleDelete = () => {
    deletePeriod(cycleIndex)
    onClose()
  }

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom))
    } else {
      setSymptoms([...symptoms, symptom])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
      <div className="bg-white rounded-t-xl p-5 w-full max-h-3/4 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Period</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            onChange={(e) =>
              setEndDate(e.target.value ? new Date(e.target.value) : null)
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Flow Intensity
          </label>
          <div className="flex space-x-2">
            {['light', 'medium', 'heavy'].map((intensity) => (
              <button
                key={intensity}
                className={`flex-1 py-2 rounded ${
                  flowIntensity === intensity
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setFlowIntensity(intensity as Intensity)}
              >
                {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSymptoms.map((symptom) => (
              <button
                key={symptom}
                className={`px-3 py-1 rounded-full text-sm ${
                  symptoms.includes(symptom)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="bg-gray-800 text-white py-2 px-4 rounded ml-auto"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

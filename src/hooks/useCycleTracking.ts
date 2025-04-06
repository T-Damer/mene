import { calculateCycleData, cycleDataAtom } from '@/atoms/periodStore'
import { MenstrualCycle } from '@/types/Period'
import { useAtom } from 'jotai'

export function useCycleTracker() {
  const [cycleData, setCycleData] = useAtom(cycleDataAtom)

  const logPeriod = (startDate: Date = new Date()) => {
    setCycleData((prevData) => {
      // Check if there's an ongoing period
      const ongoingCycleIndex = prevData.cycles.findIndex(
        (cycle) => !cycle.endDate && cycle.startDate <= startDate
      )

      let updatedCycles

      if (ongoingCycleIndex >= 0) {
        // End the ongoing period as of yesterday
        const yesterday = new Date(startDate)
        yesterday.setDate(yesterday.getDate() - 1)

        updatedCycles = [...prevData.cycles]
        updatedCycles[ongoingCycleIndex] = {
          ...updatedCycles[ongoingCycleIndex],
          endDate: yesterday,
        }
      } else {
        updatedCycles = prevData.cycles
      }

      // Add the new period
      const newCycle: MenstrualCycle = {
        startDate,
        endDate: null,
      }

      const newCycles = [newCycle, ...updatedCycles]
      const newCalculations = calculateCycleData(newCycles)

      return {
        cycles: newCycles,
        calculations: newCalculations,
        lastUpdated: new Date(),
      }
    })
  }

  // End a period
  const endPeriod = (endDate: Date = new Date()) => {
    setCycleData((prevData) => {
      // Find the current ongoing period
      const ongoingCycleIndex = prevData.cycles.findIndex(
        (cycle) => !cycle.endDate
      )

      if (ongoingCycleIndex < 0) {
        // No ongoing period to end
        return prevData
      }

      const updatedCycles = [...prevData.cycles]
      updatedCycles[ongoingCycleIndex] = {
        ...updatedCycles[ongoingCycleIndex],
        endDate,
      }

      const newCalculations = calculateCycleData(updatedCycles)

      return {
        cycles: updatedCycles,
        calculations: newCalculations,
        lastUpdated: new Date(),
      }
    })
  }

  // Edit a specific period
  const editPeriod = (
    cycleIndex: number,
    startDate?: Date,
    endDate?: Date | null,
    flowIntensity?: 'light' | 'medium' | 'heavy',
    symptoms?: string[]
  ) => {
    setCycleData((prevData) => {
      if (cycleIndex < 0 || cycleIndex >= prevData.cycles.length) {
        return prevData
      }

      const updatedCycles = [...prevData.cycles]
      updatedCycles[cycleIndex] = {
        ...updatedCycles[cycleIndex],
        ...(startDate !== undefined && { startDate }),
        ...(endDate !== undefined && { endDate }),
        ...(flowIntensity !== undefined && { flowIntensity }),
        ...(symptoms !== undefined && { symptoms }),
      }

      // Re-sort cycles by start date
      updatedCycles.sort(
        (a, b) => b.startDate.getTime() - a.startDate.getTime()
      )

      const newCalculations = calculateCycleData(updatedCycles)

      return {
        cycles: updatedCycles,
        calculations: newCalculations,
        lastUpdated: new Date(),
      }
    })
  }

  // Delete a period
  const deletePeriod = (cycleIndex: number) => {
    setCycleData((prevData) => {
      if (cycleIndex < 0 || cycleIndex >= prevData.cycles.length) {
        return prevData
      }

      const updatedCycles = prevData.cycles.filter(
        (_, index) => index !== cycleIndex
      )
      const newCalculations = calculateCycleData(updatedCycles)

      return {
        cycles: updatedCycles,
        calculations: newCalculations,
        lastUpdated: new Date(),
      }
    })
  }

  return {
    cycleData,
    logPeriod,
    endPeriod,
    editPeriod,
    deletePeriod,
    isLate: cycleData.calculations.daysLate !== null,
    daysLate: cycleData.calculations.daysLate || 0,
    periodPrediction: {
      nextPeriodDate: cycleData.calculations.nextPeriodDate,
      fertile: {
        start: cycleData.calculations.fertileWindowStart,
        end: cycleData.calculations.fertileWindowEnd,
      },
      ovulation: cycleData.calculations.ovulationDate,
    },
  }
}

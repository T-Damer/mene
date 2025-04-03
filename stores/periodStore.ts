import { atom } from 'jotai'
import persistedAtom from './persistedAtom'
import {
  MenstrualCycle,
  CycleCalculations,
  UserCycleData,
} from '@/types/Period'

export function calculateCycleData(
  cycles: MenstrualCycle[]
): CycleCalculations {
  // Need at least 2 cycles to make predictions
  if (cycles.length < 2) {
    const today = new Date()
    return {
      averageCycleLength: 28,
      averagePeriodLength: 5,
      nextPeriodDate: addDays(today, 28),
      fertileWindowStart: addDays(today, 10),
      fertileWindowEnd: addDays(today, 17),
      ovulationDate: addDays(today, 14),
      daysLate: null,
    }
  }

  const sortedCycles = [...cycles].sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  )

  let totalCycleLength = 0
  let cyclesToConsider = Math.min(sortedCycles.length - 1, 6) // Consider up to last 6 cycles

  for (let i = 0; i < cyclesToConsider; i++) {
    const currentCycle = sortedCycles[i]
    const previousCycle = sortedCycles[i + 1]
    const cycleLength = differenceInDays(
      currentCycle.startDate,
      previousCycle.startDate
    )
    totalCycleLength += cycleLength
  }

  const averageCycleLength = Math.round(totalCycleLength / cyclesToConsider)

  let totalPeriodLength = 0
  for (let i = 0; i < Math.min(sortedCycles.length, 6); i++) {
    const cycle = sortedCycles[i]
    if (cycle.endDate) {
      const periodLength = differenceInDays(cycle.endDate, cycle.startDate) + 1
      totalPeriodLength += periodLength
    }
  }

  const averagePeriodLength = Math.round(
    totalPeriodLength / Math.min(sortedCycles.length, 6)
  )

  const lastPeriod = sortedCycles[0]
  const nextPeriodDate = addDays(lastPeriod.startDate, averageCycleLength)

  const daysBeforeNextPeriod = 14
  const ovulationDate = addDays(nextPeriodDate, -daysBeforeNextPeriod)

  const fertileWindowStart = addDays(ovulationDate, -5)
  const fertileWindowEnd = addDays(ovulationDate, 1)

  const today = new Date()
  const daysLate =
    today > nextPeriodDate ? differenceInDays(today, nextPeriodDate) : null

  return {
    averageCycleLength,
    averagePeriodLength,
    nextPeriodDate,
    fertileWindowStart,
    fertileWindowEnd,
    ovulationDate,
    daysLate,
  }
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function differenceInDays(dateA: Date, dateB: Date): number {
  const diffTime = Math.abs(dateA.getTime() - dateB.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

// Persisted atom for cycle data
export const cycleDataAtom = persistedAtom<UserCycleData>('cycle-data', {
  cycles: [],
  calculations: {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    nextPeriodDate: addDays(new Date(), 28),
    fertileWindowStart: addDays(new Date(), 10),
    fertileWindowEnd: addDays(new Date(), 17),
    ovulationDate: addDays(new Date(), 14),
    daysLate: null,
  },
  lastUpdated: new Date(),
})

// Derived atom for calendar data
export const calendarDataAtom = atom((get) => {
  const cycleData = get(cycleDataAtom)

  // Generate 3 months of calendar data (past, present, future)
  const today = new Date()

  // Start from beginning of 2 months ago
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1)

  // End at the end of next month
  const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0)

  const days: CalendarDay[] = []

  // Generate all days in the range
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const day: CalendarDay = {
      date: new Date(currentDate),
      isPeriod: false,
      isFertile: false,
      isOvulation: false,
      isPredicted: true,
      symptoms: [],
    }

    // Check if this day is part of a logged period
    for (const cycle of cycleData.cycles) {
      if (cycle.endDate) {
        // Period with known end date
        if (currentDate >= cycle.startDate && currentDate <= cycle.endDate) {
          day.isPeriod = true
          day.isPredicted = false
          break
        }
      } else {
        // Ongoing period (no end date yet)
        if (currentDate >= cycle.startDate && currentDate <= today) {
          day.isPeriod = true
          day.isPredicted = false
          break
        }
      }
    }

    // Check if this day is in the predicted next period
    if (!day.isPeriod) {
      const { nextPeriodDate, averagePeriodLength } = cycleData.calculations
      const periodEndDate = addDays(nextPeriodDate, averagePeriodLength - 1)

      if (currentDate >= nextPeriodDate && currentDate <= periodEndDate) {
        day.isPeriod = true
        day.isPredicted = true
      }
    }

    // Check if this day is in the fertile window
    const { fertileWindowStart, fertileWindowEnd, ovulationDate } =
      cycleData.calculations

    if (currentDate >= fertileWindowStart && currentDate <= fertileWindowEnd) {
      day.isFertile = true
    }

    // Check if this is the predicted ovulation day
    if (isSameDay(currentDate, ovulationDate)) {
      day.isOvulation = true
    }

    days.push(day)
    currentDate = addDays(currentDate, 1)
  }

  return days
})

function isSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  )
}

interface CalendarDay {
  date: Date
  isPeriod: boolean
  isFertile: boolean
  isOvulation: boolean
  isPredicted: boolean
  symptoms: string[]
}

export interface MenstrualCycle {
  startDate: Date
  endDate: Date | null
  flowIntensity?: 'light' | 'medium' | 'heavy'
  symptoms?: string[]
}

export interface CycleCalculations {
  averageCycleLength: number
  averagePeriodLength: number
  nextPeriodDate: Date
  fertileWindowStart: Date
  fertileWindowEnd: Date
  ovulationDate: Date
  daysLate: number | null
}

export interface UserCycleData {
  cycles: MenstrualCycle[]
  calculations: CycleCalculations
  lastUpdated: Date
}

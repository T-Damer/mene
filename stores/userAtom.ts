import persistedAtom from './persistedAtom'

export enum PregnancyState {
  no = 'Нет',
  yes = 'Да',
  willing = 'Планирую',
}

type FiveStars = 1 | 2 | 3 | 4 | 5

enum ContraceptionType {
  nothing,
  progestin,
  implant,
  preservatives,
  ovulationTracking,
  outCumming,
  else,
}
enum IllnessType {
  fungus,
  bacterialVaginosis,
  genitourinaryInfections,
  polycysticOvarySyndrome,
  endometriosis,
  fibroids,
  notSure,
  nothing,
}
enum FeelingType {
  cramps,
  rashes,
  bloating,
  labileMood,
  headaches,
  soreness,
  chestPain,
  backPain,
  abdominalPain,
}

enum YesNoSure {
  yes,
  no,
  notSure,
}

enum CycleMentality {
  moodSwings,
  anxiety,
  pain,
  irritability,
  lowMood,
  premenstrualDysphoricDisorder,
  nothing,
  notSure,
}

class UserStore {
  birthDate?: number | undefined
  pregnancy?: PregnancyState
  cycleRelationship?: FiveStars
  cycleKnowledge?: FiveStars
  cycleRegularity?: boolean
  cycleBeginDate?: number | false
  contraceptionType?: ContraceptionType
  illnesses?: IllnessType
  todaysFeelings?: FeelingType
  cycleAffectsSleep?: YesNoSure
  cycleAffectsSkin?: YesNoSure
  cycleAffectsTiredness?: YesNoSure
  cycleAffectsDiet?: YesNoSure
  cycleAffectsMentality?: CycleMentality
  weight?: number
  height?: number
  willUseAppToEnhanceMyLife?: boolean
}

interface OnboardingState {
  currentStep: UserStoreKeys
  completedSteps: UserStoreKeys[]
  version: number
  didOnboard: boolean
}

interface AppState {
  userData: UserStore
  onboarding: OnboardingState
}

export type UserStoreKeys = keyof UserStore
const metadataFields = ['currentStep', 'didOnboard']
export type MetadataKeys = 'currentStep' | 'didOnboard'

export const ONBOARDING_STEPS: UserStoreKeys[] = Object.keys(
  new UserStore()
).filter((key) => !metadataFields.includes(key)) as UserStoreKeys[]

const defaultState: AppState = {
  userData: {},
  onboarding: {
    currentStep: ONBOARDING_STEPS[0],
    completedSteps: [],
    version: 1,
    didOnboard: false,
  },
}

export const appStateAtom = persistedAtom<AppState>('app-state', defaultState)

export function migrateStoredData(storedData: any): AppState {
  if (storedData?.onboarding?.version === defaultState.onboarding.version) {
    return storedData
  }

  if (storedData && !storedData.userData && !storedData.onboarding) {
    const userData: Partial<UserStore> = {}
    const completedSteps: UserStoreKeys[] = []

    for (const step of ONBOARDING_STEPS) {
      if (step in storedData && storedData[step] !== undefined) {
        userData[step] = storedData[step]
        completedSteps.push(step)
      }
    }

    return {
      userData,
      onboarding: {
        currentStep: storedData.currentStep || ONBOARDING_STEPS[0],
        completedSteps,
        version: defaultState.onboarding.version,
        didOnboard: storedData.didOnboard || false,
      },
    }
  }

  return defaultState
}

export function getFirstIncompleteStep(state: AppState): string {
  for (const step of ONBOARDING_STEPS) {
    if (!state.onboarding.completedSteps.includes(step)) {
      return step
    }
  }
  return ONBOARDING_STEPS[0]
}

import {
  UserStoreKeys,
  UserStore,
  AppState,
  onboardingSteps,
} from '@/types/AppStates'
import persistedAtom from './persistedAtom'

const defaultState: AppState = {
  userData: {},
  onboarding: {
    currentStep: onboardingSteps[0],
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

    for (const step of onboardingSteps) {
      if (step in storedData && storedData[step] !== undefined) {
        userData[step] = storedData[step]
        completedSteps.push(step)
      }
    }

    return {
      userData,
      onboarding: {
        currentStep: storedData.currentStep || onboardingSteps[0],
        completedSteps,
        version: defaultState.onboarding.version,
        didOnboard: storedData.didOnboard || false,
      },
    }
  }

  return defaultState
}

export function getFirstIncompleteStep(state: AppState): string {
  for (const step of onboardingSteps) {
    if (!state.onboarding.completedSteps.includes(step)) {
      return step
    }
  }
  return onboardingSteps[0]
}

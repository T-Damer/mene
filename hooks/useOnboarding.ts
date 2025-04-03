import { STEP_COMPONENTS, StepKey } from '@/stores/onboardingComponents'
import {
  appStateAtom,
  migrateStoredData,
  getFirstIncompleteStep,
  UserStoreKeys,
  ONBOARDING_STEPS,
} from '@/stores/userAtom'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

export function useOnboarding() {
  const [state, setState] = useAtom(appStateAtom)
  const migratedState = useMemo(() => migrateStoredData(state), [state])

  useEffect(() => {
    setState((prevState) => migrateStoredData(prevState))
  }, [])

  const updateUserData = (field: string, value: any) => {
    setState((prevState) => {
      const newState = { ...prevState }
      const typedField = field as UserStoreKeys
      newState.userData[typedField] = value

      if (!newState.onboarding.completedSteps.includes(typedField)) {
        newState.onboarding.completedSteps = [
          ...newState.onboarding.completedSteps,
          typedField,
        ]
      }

      return newState
    })
  }

  const moveToNextStep = () => {
    setState((prevState) => {
      const currentIndex = ONBOARDING_STEPS.indexOf(
        prevState.onboarding.currentStep
      )
      const nextIndex = Math.min(currentIndex + 1, ONBOARDING_STEPS.length - 1)

      const isLastStep = nextIndex === ONBOARDING_STEPS.length - 1
      const isMovingBeyondLastStep =
        currentIndex === ONBOARDING_STEPS.length - 1

      if (isMovingBeyondLastStep) {
        return {
          ...prevState,
          onboarding: {
            ...prevState.onboarding,
            didOnboard: true,
          },
        }
      }

      return {
        ...prevState,
        onboarding: {
          ...prevState.onboarding,
          currentStep: ONBOARDING_STEPS[nextIndex],
          didOnboard: isLastStep ? true : prevState.onboarding.didOnboard,
        },
      }
    })
  }

  const completeOnboarding = () => {
    setState((prevState) => ({
      ...prevState,
      onboarding: {
        ...prevState.onboarding,
        didOnboard: true,
      },
    }))
  }

  const currentStep =
    migratedState.onboarding.currentStep ||
    getFirstIncompleteStep(migratedState)

  const CurrentStepComponent = STEP_COMPONENTS[currentStep]

  return {
    state: migratedState,
    updateUserData,
    moveToNextStep,
    completeOnboarding,
    currentStep,
    CurrentStepComponent,
    isComplete: (step: StepKey) =>
      migratedState.onboarding.completedSteps.includes(step),
    isLastStep: () =>
      currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1],
  }
}

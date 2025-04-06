import { stepComponents } from '@/atoms/onboardingComponents'
import {
  appStateAtom,
  getFirstIncompleteStep,
  migrateStoredData,
} from '@/atoms/userAtom'
import { onboardingSteps, UserStoreKeys } from '@/types/AppStates'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

export function useOnboarding() {
  const [state, setState] = useAtom(appStateAtom)
  const migratedState = useMemo(() => migrateStoredData(state), [state])

  useEffect(() => {
    setState((prevState) => migrateStoredData(prevState))
  }, [])

  const updateUserData = (field: string, value: never) => {
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
    const onboardingLength = onboardingSteps.length - 1

    setState((prevState) => {
      const currentIndex = onboardingSteps.indexOf(
        prevState.onboarding.currentStep
      )
      const nextIndex = Math.min(currentIndex + 1, onboardingLength)

      const isLastStep = nextIndex === onboardingLength
      const isMovingBeyondLastStep = currentIndex === onboardingLength

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
          currentStep: onboardingSteps[nextIndex],
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

  const CurrentStepComponent = stepComponents[currentStep]

  return {
    state: migratedState,
    updateUserData,
    moveToNextStep,
    completeOnboarding,
    currentStep,
    CurrentStepComponent,
    isComplete: (step: UserStoreKeys) =>
      migratedState.onboarding.completedSteps.includes(step),
    isLastStep: () =>
      currentStep >= onboardingSteps[onboardingSteps.length - 1],
  }
}

'use client'

import { useOnboarding } from '@/hooks/useOnboarding'

export default function Onboarding() {
  const {
    state,
    updateUserData,
    moveToNextStep,
    currentStep,
    CurrentStepComponent,
  } = useOnboarding()

  return (
    <div className="flex flex-col gap-4 items-center">
      {
        <CurrentStepComponent
          value={state.userData[currentStep]}
          onChange={(value) => updateUserData(currentStep, value)}
          onContinue={moveToNextStep}
        />
      }
    </div>
  )
}

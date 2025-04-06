'use client'

import Spinner from '@/components/ui/spinner'
import { useOnboarding } from '@/hooks/useOnboarding'

export default function Onboarding() {
  const {
    state,
    updateUserData,
    moveToNextStep,
    currentStep,
    CurrentStepComponent,
  } = useOnboarding()

  if (!CurrentStepComponent) {
    return <Spinner fullScreen />
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-4 items-center justify-center">
      <CurrentStepComponent
        value={state.userData[currentStep]}
        onChange={(value) => updateUserData(currentStep, value as never)}
        onContinue={moveToNextStep}
      />
    </div>
  )
}

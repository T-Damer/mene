import { StepComponentProps } from '@/stores/onboardingComponents'

export default function CycleAffectsSleepStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>9</div>
}

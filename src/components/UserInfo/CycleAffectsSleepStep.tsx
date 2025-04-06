import { StepComponentProps } from '@/atoms/onboardingComponents'

export default function CycleAffectsSleepStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>9</div>
}

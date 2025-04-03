import { StepComponentProps } from '@/stores/onboardingComponents'

export default function CycleRegularityStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>5</div>
}

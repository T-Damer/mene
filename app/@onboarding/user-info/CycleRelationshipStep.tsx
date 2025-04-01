import { StepComponentProps } from '@/stores/onboardingComponents'

export default function CycleRelationshipStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>3</div>
}

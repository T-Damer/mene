import { StepComponentProps } from '@/atoms/onboardingComponents'

export default function CycleRelationshipStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>3</div>
}

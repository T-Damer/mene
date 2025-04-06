import { StepComponentProps } from '@/atoms/onboardingComponents'

export default function CycleAffectsTirednessStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>10</div>
}

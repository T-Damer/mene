import { StepComponentProps } from '@/stores/onboardingComponents'

export default function CycleAffectsSkinStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>10</div>
}

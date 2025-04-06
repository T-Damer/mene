import { StepComponentProps } from '@/atoms/onboardingComponents'

export default function CycleAffectsSkinStep({
  onContinue,
}: StepComponentProps) {
  return <div onClick={onContinue}>10</div>
}

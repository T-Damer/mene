import { StepComponentProps } from '@/stores/onboardingComponents'

export default function WeightStep({ onContinue }: StepComponentProps) {
  return <div onClick={onContinue}>13</div>
}

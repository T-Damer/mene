import { StepComponentProps } from '@/stores/onboardingComponents'

export default function HeightStep({ onContinue }: StepComponentProps) {
  return <div onClick={onContinue}>14</div>
}

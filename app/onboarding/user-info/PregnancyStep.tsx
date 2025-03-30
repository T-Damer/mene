import { Button } from '@/components/ui/button'
import { StepComponentProps } from '@/stores/onboardingComponents'

export default function PregnancyStep({ onContinue }: StepComponentProps) {
  return (
    <div>
      <span>Беременность</span>
      <Button onClick={onContinue}>Далее</Button>
    </div>
  )
}

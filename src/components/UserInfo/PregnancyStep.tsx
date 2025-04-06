import { StepComponentProps } from '@/atoms/onboardingComponents'
import { TogglerGroup } from '@/components/TogglerGroup'
import { Button } from '@/components/ui/button'
import { PregnancyState } from '@/types/AppStates'

export default function PregnancyStep({
  value,
  onChange,
  onContinue,
}: StepComponentProps) {
  const togglerItems = Object.values(PregnancyState)
    .filter((value) => typeof value === 'string')
    .map((value) => ({ value }))

  return (
    <>
      <span>Вы беременны? ☺️</span>
      <TogglerGroup
        items={togglerItems}
        value={value}
        onValueChange={onChange}
      />
      <Button onClick={onContinue} disabled={!value}>
        Далее
      </Button>
    </>
  )
}

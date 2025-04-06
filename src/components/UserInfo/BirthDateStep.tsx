import { StepComponentProps } from '@/atoms/onboardingComponents'
import { Button } from '@/components/ui/button'
import { BirthDatePicker } from './BirthDatePicker'

export default function BirthDateStep({
  value,
  onChange,
  onContinue,
}: StepComponentProps) {
  return (
    <>
      <span>
        Выбери дату рождения, чтобы мы могли подстроить рекомендации под тебя
      </span>
      <BirthDatePicker onChange={onChange} />
      <Button
        onClick={onContinue}
        disabled={
          !value ||
          value === new Date().getTime() ||
          value > new Date().getTime()
        }
      >
        Продолжить
      </Button>
    </>
  )
}

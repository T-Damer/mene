import { Button } from '@/components/ui/button'
import { BirthDatePicker } from './BirthDatePicker'
import { StepComponentProps } from '@/stores/onboardingComponents'

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
      <BirthDatePicker
        initialDate={value}
        onChange={(date) => onChange(date.getTime())}
      />
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

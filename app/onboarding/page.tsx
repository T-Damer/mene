'use client'

import { Button } from '@/components/ui/button'
import { BirthDatePicker } from './BirthDatePicker'
import { useUserDataStore } from '@/stores/UserData'

export default function Onboarding() {
  const { birthDate, setBirthDate, setDidOnboard } = useUserDataStore()

  return (
    <div className="flex flex-col gap-4 items-center">
      <span>Привет!</span>
      <span>Выбери дату рождения</span>
      <span>Чтобы мы могли</span>
      <span>подстроить рекомендации под тебя</span>
      <BirthDatePicker
        initialDate={birthDate}
        onChange={(date) => setBirthDate(date.getTime())}
      />
      <Button
        onClick={() => {
          setDidOnboard(true)
        }}
        disabled={
          !birthDate ||
          birthDate === new Date().getTime() ||
          birthDate > new Date().getTime()
        }
      >
        Продолжить
      </Button>
    </div>
  )
}

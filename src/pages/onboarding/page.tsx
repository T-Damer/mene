import { BlurFade } from '@/components/magicui/blur-fade'
import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function Welcome() {
  const [, setLocation] = useLocation()
  useEffect(() => {
    setTimeout(() => {
      setLocation('/onboarding/user-info')
    }, 5000)
  }, [])

  return (
    <div className="flex-1 flex flex-col justify-center h-full w-full items-center">
      <BlurFade>
        Добро пожаловать в <b>mene</b>
      </BlurFade>
      <BlurFade delay={1}>Твой помощник на каждый месяц :)</BlurFade>
    </div>
  )
}

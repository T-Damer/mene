'use client'

import { BlurFade } from '@/components/magicui/blur-fade'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Welcome() {
  useEffect(() => {
    setTimeout(() => {
      redirect('/onboarding/user-info')
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

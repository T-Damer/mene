'use client'

import Image from 'next/image'
import Logo from '../public/logo.svg'
import { redirect } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/stores/userAtom'

export default function Home() {
  const { onboarding } = useAtomValue(appStateAtom)

  if (!onboarding.didOnboard) redirect('/onboarding')

  return (
    <div className="flex flex-col gap-8 row-start-2 items-center justify-center">
      <Image src={Logo} alt="logo" width={180} height={38} priority />
    </div>
  )
}

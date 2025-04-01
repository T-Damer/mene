'use client'

import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/stores/userAtom'
import Onboarding from './@onboarding/user-info/page'
import Main from './@main/page'

export default function Home() {
  const { onboarding } = useAtomValue(appStateAtom)

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      {onboarding.didOnboard === true ? <Main /> : <Onboarding />}
    </div>
  )
}

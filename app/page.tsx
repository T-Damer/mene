'use client'

import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/stores/userAtom'
import Onboarding from './onboarding/user-info/page'
import Main from './main/page'
import { useEffect, useState } from 'react'
import Spinner from '@/components/ui/spinner'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const { onboarding } = useAtomValue(appStateAtom)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Spinner fullScreen />
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      {onboarding.didOnboard ? <Main /> : <Onboarding />}
    </div>
  )
}

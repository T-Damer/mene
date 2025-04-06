import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtomValue } from 'jotai'
import { Redirect, Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { appStateAtom } from './atoms/userAtom'
import Main from './pages/main/page'
import Onboarding from './pages/onboarding/user-info/page'

export default function App() {
  const [parent] = useAutoAnimate()
  const {
    onboarding: { didOnboard },
  } = useAtomValue(appStateAtom)

  return (
    <div
      className="container prose mx-auto max-w-prose flex flex-col min-h-[100dvh] px-5"
      ref={parent}
    >
      <Router hook={useHashLocation}>
        <Switch>
          {didOnboard ? (
            <Route path="/" component={Main} />
          ) : (
            <Route path="/" component={Onboarding} />
          )}

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

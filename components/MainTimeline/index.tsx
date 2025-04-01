import { Button } from '../ui/button'

export default function MainTimeline() {
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <span>Imagine calendar</span>

      <h2>Period in</h2>
      <h1>6 days</h1>
      <h3>Low chances of getting pregnant</h3>

      <Button>Log period</Button>
    </div>
  )
}

import { cn } from '@/helpers/utils'
import { ClassNameValue } from 'tailwind-merge'

export default function Spinner({
  className,
  fullScreen,
}: {
  className?: ClassNameValue
  fullScreen?: boolean
}) {
  return (
    <div
      className={
        fullScreen ? 'flex items-center justify-center h-[100dvh]' : ''
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('animate-spin', className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  )
}

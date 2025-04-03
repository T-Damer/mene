import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 mt-safe">
      <Avatar>
        <AvatarFallback>❤️</AvatarFallback>
      </Avatar>
      <span>Date</span>
      <span>🗓️</span>
    </div>
  )
}

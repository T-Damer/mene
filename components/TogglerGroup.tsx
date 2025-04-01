import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ReactNode } from 'react'

export function TogglerGroup({
  value,
  onValueChange,
  items,
}: {
  value: string
  onValueChange: (newValue: string) => void
  items: { component?: ReactNode; value: string; label?: string }[]
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={onValueChange}
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          aria-label={item.label}
          className="h-8 w-fit"
        >
          {item.component || item.value}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

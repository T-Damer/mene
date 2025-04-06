import { Input } from '@/components/input'

export function BirthDatePicker({
  onChange,
}: {
  onChange: (date: number) => void
}) {
  return (
    <Input
      type="date"
      className="block"
      onSelect={({ currentTarget }) => {
        if (!currentTarget.valueAsNumber) return

        onChange(currentTarget.valueAsNumber)
      }}
      autoFocus
    />
  )
}

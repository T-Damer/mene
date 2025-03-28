'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export function BirthDatePicker({
  initialDate = new Date().getTime(),
  onChange,
}: {
  initialDate?: number
  onChange: (date: Date) => void
}) {
  const [date, setDate] = useState<Date>(new Date(initialDate))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-46 justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date: Date | undefined) => {
            if (!date) return

            onChange(date)
            setDate(date)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

import { calendarDataAtom } from '@/atoms/periodStore'
import { format, isSameDay, isToday } from 'date-fns'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'

interface HorizontalCalendarProps {
  onDateSelect: (date: Date) => void
}

export default function HorizontalDates({
  onDateSelect,
}: HorizontalCalendarProps) {
  const calendarData = useAtomValue(calendarDataAtom)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Group days by month for better rendering
  const daysByMonth = calendarData.reduce(
    (acc, day) => {
      const monthYear = format(day.date, 'yyyy-MM')
      if (!acc[monthYear]) {
        acc[monthYear] = []
      }
      acc[monthYear].push(day)
      return acc
    },
    {} as Record<string, typeof calendarData>
  )

  // Scroll to today when calendar mounts
  useEffect(() => {
    if (scrollRef.current) {
      // Find today's element
      const todayElement = scrollRef.current.querySelector(
        '.calendar-day-today'
      )
      if (todayElement) {
        todayElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  }, [])

  const handleDateClick = (day: { date: Date }) => {
    setSelectedDate(day.date)
    onDateSelect(day.date)
  }

  return (
    <div className="calendar-container">
      {/* Month headers */}
      <div className="sticky top-0 bg-white z-10 flex">
        {Object.entries(daysByMonth).map(([monthYear, days]) => (
          <div
            key={monthYear}
            className="month-header"
            style={{ width: `${days.length * 40}px` }}
          >
            {format(days[0].date, 'MMMM yyyy')}
          </div>
        ))}
      </div>

      {/* Scrollable days */}
      <div className="flex overflow-x-auto py-2" ref={scrollRef}>
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={`
              calendar-day 
              flex flex-col items-center justify-center
              w-10 mx-1 rounded-lg py-1
              ${
                isToday(day.date)
                  ? 'calendar-day-today border-2 border-blue-500'
                  : ''
              }
              ${isSameDay(day.date, selectedDate) ? 'bg-gray-100' : ''}
            `}
            onClick={() => handleDateClick(day)}
          >
            <div className="text-xs">{format(day.date, 'EEE')}</div>
            <div
              className={`
                rounded-full w-8 h-8 flex items-center justify-center text-sm
                ${
                  day.isPeriod && !day.isPredicted
                    ? 'bg-red-500 text-white'
                    : ''
                }
                ${
                  day.isPeriod && day.isPredicted
                    ? 'bg-red-200 text-red-800'
                    : ''
                }
                ${day.isOvulation ? 'bg-blue-500 text-white' : ''}
                ${
                  day.isFertile && !day.isOvulation
                    ? 'bg-blue-200 text-blue-800'
                    : ''
                }
                ${!day.isPeriod && !day.isFertile ? 'bg-gray-50' : ''}
              `}
            >
              {format(day.date, 'd')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

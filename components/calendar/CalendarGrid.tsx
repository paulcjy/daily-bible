import { DayData } from './types'
import { CalendarDay } from './CalendarDay'
import { WEEKDAYS } from './constants'
import { useCallback } from 'react'

export const CalendarGrid = ({ calendar }: { calendar: DayData[] }) => {
  const getDayColor = useCallback((day: number): string => {
    if (day === 0) return 'text-red-500'
    if (day === 6) return 'text-blue-600'
    return ''
  }, [])

  return (
    <div className="p-1.5">
      <div className="grid grid-cols-7 gap-0 mb-1">
        {WEEKDAYS.map((day: string, i: number) => (
          <div
            key={i}
            className={`text-center font-bold p-1 ${getDayColor(i)}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {calendar.map((dayData, i: number) => (
          <CalendarDay key={i} dayData={dayData} />
        ))}
      </div>
    </div>
  )
}

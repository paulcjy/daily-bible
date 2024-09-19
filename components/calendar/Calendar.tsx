'use client'
import { useMemo, useState, useCallback } from 'react'
import { BibleData } from './types'
import { CalendarHeader } from './CalendarHeader'
import { CalendarNav } from './CalendarNav'
import { CalendarGrid } from './CalendarGrid'

export const Calendar = ({ bibleData }: { bibleData: BibleData }) => {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const today = useMemo(() => new Date(), [])

  const createCalendar = useCallback(
    (date: Date) => {
      const getDayStyle = (date: Date, today: Date) => {
        date.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const isPast = date < today
        const isToday = !(date.getTime() - today.getTime())
        const isSunday = date.getDay() === 0
        const isSaturday = date.getDay() === 6

        const styles = ['hover:shadow-md transition-shadow']

        if (isPast) styles.push('opacity-50')
        if (isToday) styles.push('bg-blue-100 border-blue-500')
        if (isSunday) styles.push('text-red-500')
        if (isSaturday) styles.push('text-blue-600')

        return styles.join(' ')
      }

      const year = date.getFullYear()
      const month = date.getMonth()
      const monthlyBible = bibleData[year]?.[month] ?? {}

      const firstDay = new Date(year, month, 1)
      const firstDayOfWeek = firstDay.getDay()
      const lastDay = new Date(year, month + 1, 0)
      const totalDays = lastDay.getDate()

      const totalCells = Math.ceil((firstDayOfWeek + totalDays) / 7) * 7

      return Array.from(Array(totalCells), (_, i) => {
        const day = i - firstDayOfWeek + 1
        if (day < 1 || totalDays < day) return null
        return {
          style: getDayStyle(new Date(year, month, day), today),
          ...monthlyBible[day],
          day,
        }
      })
    },
    [bibleData, today]
  )

  const calendar = useMemo(
    () => createCalendar(currentDate),
    [currentDate, createCalendar]
  )

  const changeMonth = useCallback((d: number) => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + d, 1)
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-2 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <CalendarHeader />
        <CalendarNav currentDate={currentDate} onChangeMonth={changeMonth} />
        <CalendarGrid calendar={calendar} />
      </div>
    </div>
  )
}

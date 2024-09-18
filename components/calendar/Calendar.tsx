'use client'

import { useEffect, useMemo, useState } from 'react'
import { allBibles } from 'contentlayer/generated'
import { Day, Month } from './types'
import { CalendarHeader } from './CalendarHeader'
import { CalendarNav } from './CalendarNav'
import { CalendarGrid } from './CalendarGrid'
import { createEmptyWeek, getDateStyle, getDayAndWeekIndex } from './utils'

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendar, setCalendar] = useState<Month>([])

  const today = useMemo(() => new Date(), [])

  useEffect(() => {
    const updateCalendar = () => {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const firstDay = new Date(year, month, 1).getDay()
      const lastDay = new Date(year, month + 1, 0).getDate()

      const monthlyBible = allBibles.filter((bible) => {
        return bible.year === year && bible.month === month + 1
      })

      const calendar: Month = [createEmptyWeek()]

      for (let date = 1; date <= lastDay; date++) {
        const { day, week } = getDayAndWeekIndex(date, firstDay)
        const currentDate = new Date(year, month, date)
        const dailyBible = monthlyBible.find((bible) => bible.day === date)

        const dayData: Day = {
          date: currentDate,
          style: getDateStyle(currentDate, today),
          content: dailyBible
            ? {
                url: `/${dailyBible.date}`,
                title: dailyBible.title,
              }
            : null,
        }

        if (!calendar[week]) calendar.push(createEmptyWeek())
        calendar[week][day] = dayData
      }

      setCalendar(calendar)
    }

    updateCalendar()
  }, [currentDate, today])

  const changeMonth = (d: number) =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + d, 1)
    )

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

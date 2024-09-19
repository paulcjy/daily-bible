'use client'
import { useMemo, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { BibleData, DayData } from './calendar/types'

export const LovelyCalendar = ({ bibleData }: { bibleData: BibleData }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendar, setCalendar] = useState<DayData[]>([])
  const [today, setToday] = useState(new Date())

  const CALENDAR_TITLE = '주내힘교회 청소년부'
  const CALENDAR_SUBTITLE = '성경읽기표'
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
  const MONTH_NAMES = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ]

  const createCalendar = useCallback(
    (date: Date) => {
      const getDayStyle = (date: Date, today: Date) => {
        date.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const isPast = date < today
        const isToday = date.getTime() === today.getTime()
        const isSunday = date.getDay() === 0
        const isSaturday = date.getDay() === 6

        const styles = [
          'hover:shadow-md transition-shadow hover:border-pink-300',
        ]

        if (isPast) styles.push('opacity-50')
        if (isToday) styles.push('bg-pink-100 border-pink-300')
        if (isSunday) styles.push('text-red-400')
        if (isSaturday) styles.push('text-blue-400')

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

  useEffect(() => {
    const calendar = createCalendar(currentDate)
    setCalendar(calendar)
  }, [currentDate])

  const changeMonth = useCallback((d: number) => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + d, 1)
    )
  }, [])

  const CalendarHeader = () => (
    <div className="p-2 bg-pink-300 text-white">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {CALENDAR_TITLE}
      </h1>
      <h2 className="text-lg md:text-2xl text-center flex items-center justify-center">
        {CALENDAR_SUBTITLE}
        <Heart className="ml-2" size={24} />
      </h2>
    </div>
  )

  const CalendarNav = () => (
    <div className="flex justify-between items-center p-2 bg-pink-200 text-pink-700">
      <button
        onClick={() => changeMonth(-1)}
        className="p-2 hover:bg-pink-300 hover:text-white rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-xl font-bold whitespace-pre">
        {currentDate.getFullYear()}년{' '.repeat(2)}
        {MONTH_NAMES[currentDate.getMonth()]}
      </h2>
      <button
        onClick={() => changeMonth(1)}
        className="p-2 hover:bg-pink-300 hover:text-white rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )

  const CalendarDay = ({ dayData }: { dayData: DayData }) => {
    const { day, url = '#', title, style = '' } = dayData ?? {}

    return (
      <div className={`border-2 rounded-md p-1 h-24 md:h-32 ${style}`}>
        {dayData && (
          <Link href={url} className="h-full flex flex-col">
            <span className="text-right font-semibold">{day}</span>
            <div className="mt-auto pb-2 pl-0.5 text-xs md:text-sm">
              <span className="font-medium whitespace-pre-line text-pink-600">
                {title}
              </span>
            </div>
          </Link>
        )}
      </div>
    )
  }

  const CalendarGrid = () => (
    <div className="p-1.5">
      <div className="grid grid-cols-7 gap-0 mb-1">
        {WEEKDAYS.map((day: string, i: number) => (
          <div
            key={i}
            className={`text-center font-bold p-1 ${
              i === 0 ? 'text-red-400' : ''
            } ${i === 6 ? 'text-blue-400' : ''}`}
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

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');
        body {
          font-family: 'Gaegu', cursive;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-2 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-pink-200 relative">
          <div className="relative z-10">
            <CalendarHeader />
            <CalendarNav />
            <CalendarGrid />
          </div>
        </div>
      </div>
    </>
  )
}

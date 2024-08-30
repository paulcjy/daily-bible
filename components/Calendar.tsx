'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<(number | null)[][]>([])

  const header = ['일', '월', '화', '수', '목', '금', '토']

  useEffect(() => {
    const updateCalendar = () => {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const firstDay = new Date(year, month, 1).getDay()
      const lastDate = new Date(year, month + 1, 0).getDate()

      let days: (number | null)[][] = []
      let week: (number | null)[] = Array(7).fill(null)

      for (let i = 0; i < firstDay; i++) {
        week[i] = null
      }

      for (let day = 1; day <= lastDate; day++) {
        const weekDay = (firstDay + day - 1) % 7
        week[weekDay] = day

        if (weekDay === 6 || day === lastDate) {
          days.push(week)
          week = Array(7).fill(null)
        }
      }

      setCalendarDays(days)
    }

    updateCalendar()
  }, [currentDate])

  const getToday = () => {
    const now = new Date()
    return now.getFullYear() === currentDate.getFullYear() &&
      now.getMonth() === currentDate.getMonth()
      ? now.getDate()
      : -1
  }

  const setDayColor = (idx: number) =>
    `${idx === 0 ? 'text-red-500' : ''} ${idx === 6 ? 'text-blue-600' : ''}`

  const setToday = (day: number | null) =>
    day === getToday() ? 'bg-blue-100 border-blue-500' : ''

  const setPastDay = (day: number | null) =>
    day && day < getToday() ? 'opacity-50' : ''

  const getChapter = (day: number) => {
    const end = day * 3
    const begin = end - 2
    return `시편\n${begin}-${end}`
  }

  const monthNames = [
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

  const changeMonth = (delta: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-2 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 bg-blue-600 text-white">
          <h1 className="text-xl md:text-3xl font-bold text-center">
            주내힘교회 청소년부
          </h1>
          <h2 className="text-lg md:text-2xl text-center">성경읽기표</h2>
        </div>

        <div className="flex justify-between items-center p-2 bg-blue-500 text-white">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold whitespace-pre">
            {currentDate.getFullYear()}년{' '.repeat(2)}
            {monthNames[currentDate.getMonth()]}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="p-1.5">
          <div className="grid grid-cols-7 gap-0 mb-1">
            {header.map((day, i) => (
              <div
                key={i}
                className={`text-center font-bold p-1 ${setDayColor(i)}`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {calendarDays.flat().map((day, index) => (
              <div
                key={index}
                className={`
                  border p-1 h-24 md:h-32
                  ${day ? 'hover:shadow-md transition-shadow' : ''}
                  ${setToday(day)} ${setPastDay(day)}
                `}
              >
                {day !== null && (
                  <Link href={`/${day}`} className="h-full flex flex-col">
                    <span
                      className={`text-right font-semibold ${setDayColor(
                        index % 7
                      )}`}
                    >
                      {day}
                    </span>
                    <div className="mt-auto pb-2 pl-0.5 text-xs md:text-sm">
                      <span className="font-medium whitespace-pre-line">
                        {getChapter(day)}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

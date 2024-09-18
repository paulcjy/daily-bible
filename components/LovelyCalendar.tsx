'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { allBibles } from 'contentlayer/generated'
import { Day, Month } from './calendar/types'

export const LovelyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendar, setCalendar] = useState<Month>([])

  const today = useMemo(() => new Date(), [])

  const header = ['일', '월', '화', '수', '목', '금', '토']
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

  useEffect(() => {
    const updateCalendar = () => {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const firstDay = new Date(year, month, 1).getDay()
      const lastDay = new Date(year, month + 1, 0).getDate()

      const monthlyBible = allBibles.filter((bible) => {
        return bible.year === year && bible.month === month + 1
      })

      let calendar = [Array(7).fill(null)]

      for (let date = 1; date <= lastDay; date++) {
        const index = firstDay + date - 1
        const day = index % 7
        const week = Math.floor(index / 7)

        const currentDate = new Date(year, month, date)
        const dailyBible = monthlyBible.find((bible) => bible.day === date)

        const dayData = {
          date: currentDate,
          content: dailyBible
            ? {
                url: `/${dailyBible.date}`,
                title: dailyBible.title,
              }
            : null,
        }

        if (!calendar[week]) calendar.push(Array(7).fill(null))
        calendar[week][day] = dayData
      }

      setCalendar(calendar)
    }

    updateCalendar()
  }, [currentDate])

  const getDateStyle = (day: Day) => {
    if (!day) return ''

    const date = day.date
    date.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const isPast = date < today
    const isToday = date.getTime() === today.getTime()
    const isSunday = date.getDay() === 0
    const isSaturday = date.getDay() === 6

    const styles = ['hover:shadow-md transition-shadow hover:border-pink-300']

    if (isPast) styles.push('opacity-50')
    if (isToday) styles.push('bg-pink-100 border-pink-300')
    if (isSunday) styles.push('text-red-400')
    if (isSaturday) styles.push('text-blue-400')

    return styles.join(' ')
  }

  const changeMonth = (delta: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1)
    )
  }

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
            <div className="p-2 bg-pink-300 text-white">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                주내힘교회 청소년부♡
              </h1>
              <h2 className="text-lg md:text-2xl text-center flex items-center justify-center">
                성경읽기표
              </h2>
            </div>

            <div className="flex justify-between items-center p-2 bg-pink-200 text-pink-700">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-pink-300 hover:text-white rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-bold whitespace-pre">
                {currentDate.getFullYear()}년{' '.repeat(2)}
                {monthNames[currentDate.getMonth()]}
              </h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-pink-300 hover:text-white rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="p-1.5">
              <div className="grid grid-cols-7 gap-0 mb-1">
                {header.map((day, i) => (
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
                {calendar.flat().map((day, index) => (
                  <div
                    key={index}
                    className={`
                      border-2 rounded-md p-1 h-24 md:h-32
                      ${day ? getDateStyle(day) : ''}
                    `}
                  >
                    {day && (
                      <Link
                        href={day.content?.url || '#'}
                        className="h-full flex flex-col"
                      >
                        <span className="text-right font-semibold">
                          {day.date.getDate()}
                        </span>
                        <div className="mt-auto pb-2 pl-0.5 text-xs md:text-sm">
                          <span className="font-medium whitespace-pre-line text-pink-600">
                            {day.content?.title || ''}
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
      </div>
    </>
  )
}

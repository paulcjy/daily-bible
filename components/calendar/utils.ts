import { Week } from './types'

export const getCalendarMonthTitle = (date: Date) =>
  `${date.getFullYear()}년  ${date.getMonth() + 1}월`

export const getDayColor = (day: number): string => {
  if (day === 0) return 'text-red-500'
  if (day === 6) return 'text-blue-600'
  return ''
}

export const getDateStyle = (date: Date, today: Date) => {
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

export const getDayAndWeekIndex = (date: number, firstDay: number) => {
  const index = firstDay + date - 1
  const dayIndex = index % 7
  const weekIndex = Math.floor(index / 7)
  return { day: dayIndex, week: weekIndex }
}

export const createEmptyWeek = (): Week => Array(7).fill(null)

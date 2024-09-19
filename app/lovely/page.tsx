import { allBibles } from 'contentlayer/generated'
import { LovelyCalendar } from '@/components/LovelyCalendar'
import { BibleData, DayData } from '@/components/calendar/types'

export default function Home() {
  const generateBibleData = () =>
    allBibles.reduce((acc, bible) => {
      const { date, year, month, day, title } = bible
      const dailyBible: DayData = { day, title, url: `/${date}` }

      acc[year] ??= {}
      acc[year][month] ??= {}
      acc[year][month][day] = dailyBible
      return acc
    }, {} as BibleData)

  const bibleData = generateBibleData()
  return (
    <div className="h-screen">
      <LovelyCalendar bibleData={bibleData} />
    </div>
  )
}

import Link from 'next/link'
import { DayData } from './types'

export const CalendarDay = ({ dayData }: { dayData: DayData }) => {
  const { day, url = '#', title, style = '' } = dayData ?? {}

  return (
    <div className={`border p-1 h-24 md:h-32 ${style}`}>
      {dayData && (
        <Link href={url} className="h-full flex flex-col">
          <span className="text-right font-semibold">{day}</span>
          <div className="mt-auto pb-2 pl-0.5 text-xs md:text-sm">
            <span className="font-medium whitespace-pre-line text-black">
              {title}
            </span>
          </div>
        </Link>
      )}
    </div>
  )
}

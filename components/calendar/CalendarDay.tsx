import Link from 'next/link'
import { Day } from './types'

export const CalendarDay = ({ day }: { day: Day }) => {
  const style = day?.style ?? ''
  const url = day?.content?.url ?? '#'
  const title = day?.content?.title ?? ''

  return (
    <div className={`border p-1 h-24 md:h-32 ${style}`}>
      {day?.date && (
        <Link href={url} className="h-full flex flex-col">
          <span className="text-right font-semibold">{day.date.getDate()}</span>
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

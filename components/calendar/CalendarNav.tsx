import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getCalendarMonthTitle } from './utils'

export const CalendarNav = ({
  currentDate,
  onChangeMonth,
}: {
  currentDate: Date
  onChangeMonth: (d: number) => void
}) => {
  return (
    <div className="flex justify-between items-center p-2 bg-blue-500 text-white">
      <button
        onClick={() => onChangeMonth(-1)}
        className="p-2 hover:bg-blue-600 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-xl font-bold whitespace-pre">
        {getCalendarMonthTitle(currentDate)}
      </h2>
      <button
        onClick={() => onChangeMonth(1)}
        className="p-2 hover:bg-blue-600 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

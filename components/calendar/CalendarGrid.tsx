import { Day, Month } from './types'
import { CalendarDay } from './CalendarDay'
import { WEEKDAYS } from './constants'
import { getDayColor } from './utils'

export const CalendarGrid = ({ calendar }: { calendar: Month }) => {
  return (
    <div className="p-1.5">
      <div className="grid grid-cols-7 gap-0 mb-1">
        {WEEKDAYS.map((day: string, i: number) => (
          <div
            key={i}
            className={`text-center font-bold p-1 ${getDayColor(i)}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {calendar.flat().map((day: Day, i: number) => (
          <CalendarDay key={i} day={day} />
        ))}
      </div>
    </div>
  )
}

import { CALENDAR_SUBTITLE, CALENDAR_TITLE } from './constants'

export const CalendarHeader = () => (
  <div className="p-2 bg-blue-600 text-white">
    <h1 className="text-xl md:text-3xl font-bold text-center">
      {CALENDAR_TITLE}
    </h1>
    <h2 className="text-lg md:text-2xl text-center">{CALENDAR_SUBTITLE}</h2>
  </div>
)

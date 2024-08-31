import { Calendar } from '@/components/Calendar'
import { LovelyCalendar } from '@/components/LovelyCalendar'

export default function Home() {
  return (
    <div className="h-screen">
      {/* <div className="h-[7vh] text-center align-middle">
        <p className="sm:inline sm:text-2xl">주내힘교회 청소년부</p>
        <p className="sm:inline sm:text-2xl sm:p-2">성경읽기표</p>
      </div>
      <div className="h-[6vh] text-2xl sm:text-4xl text-center align-middle">
        7월
      </div> */}
      <LovelyCalendar />
    </div>
  )
}

import { Calendar } from "@/components/Calendar";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-[8vh] text-center align-middle">
        <p>주내힘교회 청소년부</p>
        <p>2024 여름수련회 성경읽기</p>
      </div>
      <div className="h-[7vh] text-2xl text-center align-middle">7월</div>
      <div className="h-[85vh]">
        <Calendar />
      </div>
    </div>
  )
}

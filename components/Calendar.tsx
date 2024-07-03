import Link from "next/link";

export const Calendar = () => {
  const header = ['일', '월', '화', '수', '목', '금', '토']
  const july: number[][] = Array.from(Array(5), () => Array(7).fill(0))
  const julyStartIdx = 1;
  const julyDays = 31;
  for (let i = julyStartIdx, day = 1; day <= julyDays; i++, day++) july[Math.floor(i / 7)][i % 7] = day

  const exodus = [null, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23-24', '25-26', '27-28', '29-30', '31-32', '33-34', '35-36', '37-38', '39-40']
  
  const today = () => new Date().getDate()

  const setDayColor = (idx: number) => `${idx === 0 ? 'text-red-500' : ''} ${idx === 6 ? 'text-blue-600' : ''}`

  return (
    <div className="display-table border-collapse h-[87vh] w-screen">
      <div className="table-header-group h-[4vh]">
        <div className="table-row">
          {header.map((day, i) => (
            <div key={i} className={`w-[15vw] table-cell border text-center font-bold align-middle sm:text-xl ${setDayColor(i)}`}>{day}</div>
          ))}
        </div>
      </div>
      <div className="table-row-group h-[75vh]">
        {july.map((row: number[], i) => (
          <div key={i} className="table-row">
            {row.map((day: number, i) => (
              <Link key={i} href={day ? `/${day}` : '#'} className={`table-cell border ${day === today() ? 'border-2 border-red-400 bg-red-100/50' : null}`}>
                {day ?
                  <div>
                    <div className={`p-1.5 sm:p-2 font-bold sm:text-xl ${setDayColor(i)}`}>{day}</div>
                    <div className="p-1 sm:p-2 text-[0.7rem] sm:text-lg">
                      <p className="lg:inline">출애굽기</p>
                      <p className="lg:inline lg:pl-1">{exodus[day]}장</p>
                    </div>
                  </div> :
                  null}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// (
//   <div key={i} className="table-cell border w-20 p-1 h-[16vh]">{col ? col : ''}
//     {col ?
//       <div className="border w-full text-center">{`출애굽기 ${col}장`}</div> : null}
//   </div>
// )

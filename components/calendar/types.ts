export interface DayContent {
  url: string
  title: string
}

export interface DayData {
  date: Date
  style: string
  content: DayContent | null
}

export type Day = DayData | null

export type Week = Day[]

export type Month = Week[]

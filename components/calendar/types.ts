export interface BibleData {
  [year: number]: {
    [month: number]: {
      [day: number]: DayData
    }
  }
}

export type DayData = {
  day: number
  url?: string
  title?: string
  style?: string
} | null

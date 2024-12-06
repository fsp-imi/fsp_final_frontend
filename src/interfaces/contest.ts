import { IPagination } from "./pagination"

export interface IContest {
  id: number
  program: string
  code: string
  male: boolean
  female: boolean
  start: string
  end: string
  place: number
  country: number
  contestants: number
  contest_type: number
}

export interface IGetAllContests {
  data: IContest[]
  pages: IPagination
}

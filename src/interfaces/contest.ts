import { IPagination } from "./pagination"

export interface IContest {
  id: number
  name: string
  start_time: string
  end_time: string
  place: number
  contest_type: number
  format: string
  status: string
}

interface IDisciplines {
  [key: string]: string[]
}

interface IAges {
  [key: string]: string[]
}

export interface IGetAllContests {
  data: {
    contests: IContest[]
    disciplines: IDisciplines
    ages: IAges
  }
  pages: IPagination
}

import { IPagination } from "./pagination"

export interface IContest {
  id: number
  name: string
  start_time: string
  end_time: string
  place: string
  contest_type: number
  format: "ONLINE" | "OFFLINE" | "ONOFFLINE"
  status: string
  file: string
}

interface IDisciplines {
  [key: string]: string[]
}

interface IAges {
  [key: string]: string[]
}

interface ISportType {
  [key: string]: string[]
}

export interface IGetAllContests {
  data: {
    contests: IContest[]
    disciplines: IDisciplines
    ages: IAges
    sport_types: ISportType
  }
  pages: IPagination
}

export interface IGetOneContest {
  data: {
    contest: IContest
    disciplines: IDisciplines
    age_group: IAges
    sport_types: ISportType
  }
}

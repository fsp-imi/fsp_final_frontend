import { IPagination } from "./pagination"

export interface IAnalyticItem {
  [region: string]: number
}

export interface IAnalytic {
  pages: IPagination
  data: IAnalyticItem[]
}

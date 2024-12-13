import { IPagination } from "./pagination"

export interface IAnalytic {
  pages: IPagination
  data: { [region: string]: number }
}

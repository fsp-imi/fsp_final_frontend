import { IContest } from "./contest"

export interface IResult {}

export interface IGetOneResult {
  id: number
  contest: IContest
  team: {
    id: number
    name: string
    members: string | null
  }
  score: number
}

export interface IPreviewColumn {
  column_index: number
  num_rows: number
  header: string
  file: File
}

export interface IPreviewColumnResponse {
  [key: string]: string[]
}

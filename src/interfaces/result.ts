export interface IResult {}

export interface IPreviewColumn {
  column_index: number
  num_rows: number
  header: string
  file: File
}

export interface IPreviewColumnResponse {
  [key: string]: string[]
}

export interface IClaim {
  id: number
  start_time: Date
  end_time: Date
  place: string
  format: claimFormat
}

export interface IClaimFile {
  file: File
  desciption: string
}

export interface IClaimCreate {
  start_time: Date
  end_time: Date
  place: string
  format: claimFormat
}

export enum claimFormat {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  ONLINEOFFLINE = "ONLINEOFFLINE",
}
export interface IClaim {
  id: number
  name: string
  receiver_federation?: number
  sender_federation: number
  contest_type: string
  contest_discipline: number[]
  contest_age_group: number[]
  start_time: Date
  end_time: Date
  place: string
  status: string
  format: claimFormat
}

export interface IClaimFile {
  file: File
  desciption: string
}

export interface IClaimCreate {
  name: string
  receiver_federation?: number
  sender_federation: number
  contest_type: string
  contest_discipline: number[]
  contest_age_group: number[]
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

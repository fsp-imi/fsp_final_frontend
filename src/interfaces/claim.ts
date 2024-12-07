export interface IClaim {
  id: number 
  start_time: Date 
  end_time: Date
  place: string
  format: "ONLINE" | "OFFLINE" | "ONOFFLINE"
}

export interface IClaimFile {
  file: File
  desciption: string
}

export interface IClaimCreate {
  start_time: Date 
  end_time: Date
  place: string
  format: "ONLINE" | "OFFLINE" | "ONOFFLINE"
}
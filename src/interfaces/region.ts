import { IDistrict } from "./district"

export interface IRegion {
  id: number 
  district: IDistrict 
  name: string
}
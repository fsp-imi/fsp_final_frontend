import { IRegion } from "./region"

export interface ICity {
  id: number
  region: IRegion
  name: string
}

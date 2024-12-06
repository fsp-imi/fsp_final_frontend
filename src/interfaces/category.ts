import { IAgeGroup } from "./age-group"

export interface ICategory {
  id: number
  age: IAgeGroup
}

export interface IGetAllCategories {
  data: ICategory[]
}

export interface IGetCategory {
  data: ICategory
}

export interface IContestCategory {
  id: number
  contest: number
  category: number
}

export interface IGetAllContestCategories {
  data: IContestCategory[]
}

export interface IGetContestCategory {
  data: IContestCategory[]
}

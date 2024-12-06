import { instance } from "../../api/api.interceptor"
import {
  IGetAllContestCategories,
  IGetContestCategory,
} from "../../interfaces/contest-category"

export const ContestCategoryService = {
  async getAll(): Promise<IGetAllContestCategories> {
    const response = await instance({
      url: `/contestapi/contestcategories`,
      method: "GET",
    })

    return response
  },

  async getById(id: string | number): Promise<IGetContestCategory> {
    const response = await instance({
      url: `/contestapi/contestcategories/${id}`,
      method: "GET",
    })

    return response
  },
}

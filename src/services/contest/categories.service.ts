import { instance } from "../../api/api.interceptor"
import { IGetAllCategories, IGetCategory } from "../../interfaces/category"

export const CategoriesService = {
  async getAll(): Promise<IGetAllCategories> {
    const response = await instance({
      url: `/contests/categories`,
      method: "GET",
    })

    return response
  },

  async getById(id: string | number): Promise<IGetCategory> {
    const response = await instance({
      url: `/contests/categories/${id}`,
      method: "GET",
    })

    return response
  },
}

import { instance } from "../../api/api.interceptor"
import { IRegion } from "../../interfaces/region"

export const RegionService = {
  async getAll(): Promise<IRegion[]> {
    const response = await instance({
      url: `/countries/regions`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IRegion> {
    const response = await instance({
      url: `/countries/regions/${id}`,
      method: "GET",
    })

    return response.data
  },
}

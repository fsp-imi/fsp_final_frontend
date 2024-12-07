import { instance } from "../../api/api.interceptor"
import { IAgeGroup } from "../../interfaces/age-group"

export const AgeGroupService = {
  async getAll(): Promise<IAgeGroup[]> {
    const response = await instance({
      url: `/contests/agegroups/`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IAgeGroup[]> {
    const response = await instance({
      url: `/contests/agegroups/${id}`,
      method: "GET",
    })

    return response.data
  },
}

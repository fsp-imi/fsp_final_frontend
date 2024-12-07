import { instance } from "../../api/api.interceptor"
import { ICity } from "../../interfaces/city"

export const CityService = {
  async getAll(): Promise<ICity[]> {
    const response = await instance({
      url: `/countries/cities`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<ICity> {
    const response = await instance({
      url: `/countries/cities/${id}`,
      method: "GET",
    })

    return response.data
  },
}

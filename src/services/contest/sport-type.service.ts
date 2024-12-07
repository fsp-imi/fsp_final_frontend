import { instance } from "../../api/api.interceptor"
import { ISportType } from "../../interfaces/sport-type"

export const SportTypeService = {
  async getAll(): Promise<ISportType[]> {
    const response = await instance({
      url: "/contests/sporttypes",
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<ISportType> {
    const response = await instance({
      url: `/contests/sporttypes/${id}`,
      method: "GET",
    })

    return response.data
  },
}

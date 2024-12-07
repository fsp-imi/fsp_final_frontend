import { instance } from "../../api/api.interceptor"
import { IDiscipline } from "../../interfaces/discipline"

export const DisciplineService = {
  async getAll(): Promise<IDiscipline[]> {
    const response = await instance({
      url: `/contests/disciplines`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IDiscipline> {
    const response = await instance({
      url: `/contests/disciplines/${id}`,
      method: "GET",
    })

    return response.data
  },

  async getBySportTypes(data: string[]) {
    const response = await instance({
      url: `/contests/disciplines/by_sport_type${
        data.length > 0 ? "?sporttype=" : ""
      }${data.join("&sporttype=")}`,
      method: "GET",
    })

    return response.data
  },
}

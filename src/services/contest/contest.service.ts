import { instance } from "../../api/api.interceptor"
import { IGetAllContests, IGetOneContest } from "../../interfaces/contest"

export const ContestService = {
  async getAll(searchParams?: string): Promise<IGetAllContests> {
    const response = await instance({
      url: `/contests/filter${"?" + searchParams}`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IGetOneContest> {
    const response = await instance({
      url: `/contests/${id}`,
      method: "GET",
    })

    return response.data
  },
}

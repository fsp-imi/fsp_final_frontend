import { instance } from "../../api/api.interceptor"
import {
  IContestType,
} from "../../interfaces/contest-type"

export const ContestTypeService = {
  async getAll(): Promise<IContestType[]> {
    const response = await instance({
      url: `/contests/contesttypes/`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IContestType> {
    const response = await instance({
      url: `/contests/contesttypes/${id}`,
      method: "GET",
    })

    return response.data
  },
}

import { instance } from "@/api/api.interceptor"
import { IAnalytic } from "@/interfaces/analytic"

export const AnalyticService = {
  async getAll(searchParams: string): Promise<IAnalytic> {
    const response = await instance({
      url: `/analytics/average-scores${searchParams ? "?" + searchParams : ""}`,
    })

    return response.data
  },

  async getAllForTeams(searchParams: string): Promise<IAnalytic> {
    const response = await instance({
      url: `/analytics/region-teams${searchParams ? "?" + searchParams : ""}`,
    })

    return response.data
  },
}

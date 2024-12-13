import { instance } from "@/api/api.interceptor"
import { IAnalytic } from "@/interfaces/analytic"

export const AnalyticService = {
  async getAll(): Promise<IAnalytic> {
    const response = await instance({ url: `/analytics/average-scores` })

    return response.data
  },
}

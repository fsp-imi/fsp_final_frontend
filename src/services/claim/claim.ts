import { instance } from "@/api/api.interceptor"
import { IClaim, IClaimCreate } from "@/interfaces/claim"

export const ClaimService = {
  async getAll(): Promise<IClaim[]> {
    const response = await instance({
      url: "/claims",
      method: "GET",
    })

    return response.data
  },

  async get(id: string | number): Promise<IClaim> {
    const response = await instance({
      url: `/claims/${id}`,
      method: "GET",
    })

    return response.data
  },

  async create(data: IClaimCreate) {
    const response = await instance({
      url: `/claims/`,
      method: "POST",
      data,
    })

    return response.data
  },

  async change(data: Partial<IClaim>): Promise<IClaim> {
    const response = await instance({
      url: `/claims/${data.id}/`,
      method: "POST",
      data,
    })

    return response.data
  },
}

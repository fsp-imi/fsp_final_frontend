import { instance } from "@/api/api.interceptor"
import { IFederation } from "@/interfaces/federation"

export const FederationService = {
  async getAll(): Promise<IFederation[]> {
    const response = await instance({ url: "/federations", method: "get" })

    return response.data
  },

  async getMy(): Promise<IFederation> {
    const response = await instance({
      url: "/federations/profile",
      method: "get",
    })

    return response.data
  },

  async get(id: string | number): Promise<IFederation> {
    const response = await instance({
      url: `/federations/${id}`,
      method: "get",
    })

    return response.data
  },

  async changeProfile(data: Partial<IFederation>): Promise<IFederation> {
    const response = await instance({
      url: `/federations/${data.id}/`,
      method: "PUT",
      data,
    })

    return response.data
  },
}

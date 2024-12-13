import { instance } from "@/api/api.interceptor"
import { IGetOneResult, IResult } from "@/interfaces/result"

export const ResultService = {
  async previewColumn(data: FormData) {
    const response = await instance({
      url: `/results/preview-column/`,
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },

  async getAll(): Promise<IResult[]> {
    const response = await instance({
      url: "/results",
      method: "GET",
    })

    return response.data
  },

  async getByContestId(id: string | number): Promise<IGetOneResult[]> {
    const response = await instance({
      url: `/results/${id}/`,
      method: "GET",
    })

    if (response.status === 404) throw new Error("Результатов нет")

    return response.data
  },

  async create(data: FormData) {
    const response = await instance({
      url: "/results/upload/",
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },
}

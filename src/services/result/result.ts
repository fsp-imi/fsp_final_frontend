import { instance } from "@/api/api.interceptor"

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
}

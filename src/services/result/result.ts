import { instance } from "@/api/api.interceptor"
import { IPreviewColumn } from "@/interfaces/result"

export const ResultService = {
  async previewColumn(data: IPreviewColumn) {
    const response = await instance({
      url: `/results/preview-column`,
      method: "POST",
      data,
    })

    return response.data
  },
}

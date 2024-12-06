import { instance } from "../../api/api.interceptor"

export const GenderGroupsService = {
  async getAll() {
    const response = await instance({
      url: `/contestapi/gendergroups`,
      method: "GET",
    })

    return response
  },

  async getById(id: string | number) {
    const response = await instance({
      url: `/contestapi/gendergroups/${id}`,
      method: "GET",
    })

    return response
  },
}

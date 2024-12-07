import { instance } from "../../api/api.interceptor"

export const GenderGroupsService = {
  async getAll() {
    const response = await instance({
      url: `/contests/gendergroups`,
      method: "GET",
    })

    return response
  },

  async getById(id: string | number) {
    const response = await instance({
      url: `/contests/gendergroups/${id}`,
      method: "GET",
    })

    return response
  },
}

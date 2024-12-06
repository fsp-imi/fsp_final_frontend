import { instance } from "@/api/api.interceptor"
import { IUser } from "@/interfaces/user"

export const UserService = {
  async getProfile(): Promise<IUser> {
    const response = await instance({
      url: `/userapi/profile`,
      method: "GET",
    })

    return response.data
  },

  async changeProfile(data: Partial<IUser>): Promise<IUser> {
    const response = await instance({
      url: `/userapi/profile/`,
      method: "POST",
      data,
    })

    return response.data
  },
}

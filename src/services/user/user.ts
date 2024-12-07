import { instance } from "@/api/api.interceptor"
import { IUser } from "@/interfaces/user"

export const UserService = {
  async getAll(): Promise<IUser[]> {
    const response = await instance({
      url: `/users/`,
      method: "GET",
    })

    return response.data
  },

  async getProfile(): Promise<IUser> {
    const response = await instance({
      url: `/users/profile`,
      method: "GET",
    })

    return response.data
  },

  async changeProfile(data: Partial<IUser>): Promise<IUser> {
    const response = await instance({
      url: `/users/profile/`,
      method: "POST",
      data,
    })

    return response.data
  },

  async getUser(id: string | number): Promise<IUser> {
    const response = await instance({
      url: `/users/${id}`,
      method: "GET",
    })

    return response.data
  },
}

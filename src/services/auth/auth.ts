import { instance } from "@/api/api.interceptor"
import {
  IAuthCheckResponse,
  IAuthResponse,
  ILoginPassword,
  IRegistrationData,
} from "@/interfaces/auth"

export const AuthService = {
  async check(): Promise<boolean> {
    const response = await instance<IAuthCheckResponse>({
      url: "/users/check-token/",
      method: "GET",
    })

    return response.data.detail
  },

  async login(data: ILoginPassword): Promise<IAuthResponse> {
    const response = await instance({
      url: "/users/api-token-auth/",
      method: "POST",
      data,
    })

    return response.data
  },

  async register(data: IRegistrationData): Promise<IAuthResponse> {
    const response = await instance({
      url: "/users/create/",
      method: "POST",
      data,
    })

    return response.data
  },

  async checkToken(token: string): Promise<string> {
    const response = await instance({
      url: "/password/reset/validate_token/",
      method: "POST",
      data: {token}
    })

    return response.data.status
  },

  async changePassword(password: string, token: string) {
    const response = await instance({
      url: "/password/reset/confirm/",
      method: "POST",
      data: {token, password}
    })

    return response.data
  },

  async resetPassword(email: string) {
    const response = await instance({
      url: "/password/reset/",
      method: "POST",
      data: {email}
    })

    return response.data.status
  },

  async verifyEmail(uuid: string, token: string) {
    const response = await instance({
      url: `/users/activate/${uuid}/${token}/`,
      method: "GET"
    })

    return response.data
  }
}

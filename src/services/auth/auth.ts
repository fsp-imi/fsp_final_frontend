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
      url: "/users/users/create/",
      method: "POST",
      data: {
        login: data.login,
        password: data.password,
        email: data.email,
        fio: data.fio,
      },
    })

    return response.data
  },
}

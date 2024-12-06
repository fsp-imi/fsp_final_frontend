import { create } from "zustand"
import { AuthService } from "@/services/auth/auth"
import {
  getToken,
  removeFromStorage,
  setToken,
} from "../services/auth/auth.helper"
import { IUser } from "@/interfaces/user"
import { ILoginPassword, IRegistrationData } from "@/interfaces/auth"
import { UserService } from "@/services/user/user"

interface IUserStore {
  isLoading: boolean
  isAuth: boolean
  user: IUser | null
  isError: boolean
  error: string | null
  setUser: (data: IUser) => void
  check: () => void
  login: (data: ILoginPassword) => void
  register: (data: IRegistrationData) => void
  logout: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isLoading: true,
  isAuth: false,
  user: null,
  isError: false,
  error: null,
  setUser: (data: IUser) => {
    set({
      user: data,
    })
  },
  check: async () => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    const token = getToken()

    let isLogged = false

    if (token) {
      isLogged = await AuthService.check()
    }

    if (!isLogged) {
      removeFromStorage()

      set({
        isLoading: false,
        isAuth: false,
        isError: false,
        error: null,
        user: null,
      })
    } else {
      const user = await UserService.getProfile()

      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
        user,
      })
    }
  },
  login: async (data: ILoginPassword) => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    try {
      const response = await AuthService.login(data)
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.errors[0],
      })
    }
  },
  register: async (data: IRegistrationData) => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    try {
      const response = await AuthService.register(data)
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.errors[0],
      })
    }
  },
  logout: async () => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    removeFromStorage()

    set({
      isLoading: false,
      isAuth: false,
      isError: false,
      error: null,
    })
  },
}))

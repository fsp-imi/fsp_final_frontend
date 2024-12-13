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
  setUser: (data: IUser) => Promise<void>
  check: () => void
  login: (data: ILoginPassword) => Promise<void>
  register: (data: IRegistrationData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => {}
}

export const useUserStore = create<IUserStore>((set) => ({
  isLoading: true,
  isAuth: false,
  user: null,
  isError: false,
  error: null,
  setUser: async (data: IUser) => {
    set({
      user: data,
    })
  },
  check: async () => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      user: null,
      error: null,
    })

    const token = getToken()

    let isLogged = false

    if (token) {
      try {
        isLogged = await AuthService.check()
      } catch (error) {
        isLogged = false
      }
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
        isAuth: true,
        isError: false,
        error: null,
        user,
        isLoading: false,
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

      const user = await UserService.getProfile()

      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
        user,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.details[0],
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

      // const user = await UserService.getProfile()

      set({
        isLoading: false,
        isAuth: false,
        isError: false,
        error: null,
        // user,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.details[0],
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
      user: null,
    })
  },
  clearError: async () => {
    set({
      isLoading: false,
      isError: false,
      error: null,
    })
  },
}))

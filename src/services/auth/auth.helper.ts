
import { IAuthResponse } from "@/interfaces/auth"
import Cookies from "js-cookie"

export const getToken = () => {
  const accessToken = Cookies.get("token")
  return accessToken || null
}

export const setToken = (token: string) => {
  Cookies.set("token", token)
}

export const removeFromStorage = () => {
  Cookies.remove("token")
}

export const saveToStorage = (data: IAuthResponse) => {
  setToken(data.token)
}

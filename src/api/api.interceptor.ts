import { errorCatch, getContentType } from "@/api/api.helper"
import { getToken, removeFromStorage } from "@/services/auth/auth.helper"

import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: getContentType(),
})

instance.interceptors.request.use((config) => {
  const token = getToken()

  if (config.headers && token) config.headers.Authorization = `Token ${token}`

  return config
})

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        return instance.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeFromStorage()
      }
    }

    throw error
  }
)

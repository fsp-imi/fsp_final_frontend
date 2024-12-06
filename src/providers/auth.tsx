import LoaderScreen from "@/components/ui/loader-screen"

import { createContext, ReactNode, useEffect } from "react"
import { useUserStore } from "../store/user.store"
import { useLocation, useNavigate, useSearchParams } from "react-router"
import { getToken } from "../services/auth/auth.helper"

interface IAuthContext {}

export const AuthContext = createContext<IAuthContext>({})

const authRoutes = ["/login", "/registration"]

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { check, isAuth, isLoading } = useUserStore()

  const { pathname } = useLocation()

  const [searchParams] = useSearchParams()

  const navigateWithoutLosingSearchParams = (newPath: string) => {
    navigate(`${newPath}?${searchParams.toString()}`)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      await check()
    }

    checkAuth()
  }, [check])

  useEffect(() => {
    const oldPathname = pathname

    const token = getToken()

    if (!isLoading) {
      if (token) {
        if (authRoutes.includes(pathname)) {
          navigateWithoutLosingSearchParams("/")
        } else {
          navigateWithoutLosingSearchParams(oldPathname)
        }
      } else {
        if (!authRoutes.includes(pathname)) {
          // navigateWithoutLosingSearchParams("/login")
        }
      }
    }
  }, [isAuth, isLoading, pathname])

  if (isLoading) return <LoaderScreen />

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export default AuthProvider

import LoaderScreen from "@/components/ui/loader-screen"

import { ReactNode, useEffect } from "react"
import { useUserStore } from "../store/user"
import { useLocation, useNavigate, useSearchParams } from "react-router"
import { getToken } from "../services/auth/auth.helper"

const authRoutes = ["/login", "/registration"]
const wihtoutAuthRoutes = [
  "/",
  "/analytics",
  "/analytics/team",
  "/email-verification",
]
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { check, isAuth, isLoading, clearError } = useUserStore()

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
        if (wihtoutAuthRoutes.includes(pathname)) {
        }
        if (authRoutes.includes(pathname)) {
          navigateWithoutLosingSearchParams("/")
        } else {
          navigateWithoutLosingSearchParams(oldPathname)
        }
      } else {
        if (
          !pathname.startsWith(
            "/contest/") &&
          !pathname.startsWith("/password-reset")
        )
          if (
            !wihtoutAuthRoutes.includes(pathname) &&
            !authRoutes.includes(pathname)
          ) {
            navigateWithoutLosingSearchParams("/login")
          }
      }
    }

    clearError()
  }, [isAuth, isLoading, pathname])

  if (isLoading) return <LoaderScreen />

  return <>{children}</>
}

export default AuthProvider

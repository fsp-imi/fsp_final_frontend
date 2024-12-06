import AuthProvider from "@/providers/auth"

import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col relative justify-center items-center bg-darkgray">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  )
}

export default AuthLayout

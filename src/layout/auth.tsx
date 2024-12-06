import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative justify-center items-center bg-darkgray">
      <Outlet />
    </div>
  )
}

export default AuthLayout

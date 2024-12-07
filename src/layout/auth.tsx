import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"

import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative justify-stretch bg-[url('/registration.jpg')] bg-cover">
      <Header />

      <Outlet />

      <Footer />
    </div>
  )
}

export default AuthLayout

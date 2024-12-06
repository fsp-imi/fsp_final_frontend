import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"

import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col relative justify-stretch bg-darkgray">
      <Header />

      <div className="flex-1 px-8 py-8 relative flex flex-col justify-center items-center">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default MainLayout

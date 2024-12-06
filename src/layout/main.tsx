import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return <div>
    <Header />

    <Outlet />

    <Footer />
  </div>
}

export default MainLayout

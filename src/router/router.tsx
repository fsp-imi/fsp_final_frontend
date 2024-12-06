import LoginScreen from "@/components/screens/login"
import ProfileScreen from "@/components/screens/profile"
import RegistrationScreen from "@/components/screens/registration"
import MainLayout from "@/layout/main"

import { Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  )
}

export default Router

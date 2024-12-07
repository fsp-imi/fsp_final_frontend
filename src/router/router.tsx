import ContestSearch from "@/components/screens/contest-search"
import ErrorScreen from "@/components/screens/error"
import LoginScreen from "@/components/screens/login"
import MainScreen from "@/components/screens/main"
import NotFoundScreen from "@/components/screens/not-found"
import Personal from "@/components/screens/personal"
import ProfileScreen from "@/components/screens/profile"
import RegistrationScreen from "@/components/screens/registration"
import AuthLayout from "@/layout/auth"
import MainLayout from "@/layout/main"
import FiltersProvider from "@/providers/filters"

import { Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" index element={<LoginScreen />} />
        <Route path="/registration" element={<RegistrationScreen />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<MainScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route
          path="/contest-search"
          element={
            <FiltersProvider>
              <ContestSearch />
            </FiltersProvider>
          }
        />
        <Route path="/personal" element={<Personal />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  )
}

export default Router

import ContestSearch from "@/components/screens/contest-search"
import ErrorScreen from "@/components/screens/error"
import FederationScreen from "@/components/screens/federation"
import FederationsScreen from "@/components/screens/federations"
import LoginScreen from "@/components/screens/login"
import NotFoundScreen from "@/components/screens/not-found"
import ProfileScreen from "@/components/screens/profile"
import RegistrationScreen from "@/components/screens/registration"
import AuthLayout from "@/layout/auth"
import MainLayout from "@/layout/main"
import FederationProfile from "@/components/screens/federation-profile"
import FiltersProvider from "@/providers/filters"
import ResultUploadScreen from "@/components/screens/result-upload"
import ResultsScreen from "@/components/screens/results"
import Lk from "@/components/screens/lk"
import ClaimScreen from "@/components/screens/claim"
import CreateClaim from "@/components/screens/create-claim"

import { Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" index element={<LoginScreen />} />
        <Route path="/registration" element={<RegistrationScreen />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          index
          element={
            <FiltersProvider>
              <ContestSearch />
            </FiltersProvider>
          }
        />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/federation" element={<FederationProfile />} />
        <Route path="/federations" element={<FederationsScreen />} />
        <Route path="/federations/:id" element={<FederationScreen />} />
        <Route path="/result-upload/:id" element={<ResultUploadScreen />} />
        <Route path="/lk" element={<Lk />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/create-claim" element={<CreateClaim />} />
        <Route path="/claim/:id" element={<ClaimScreen />} />
        <Route
          path="/contest-search"
          element={
            <FiltersProvider>
              <ContestSearch />
            </FiltersProvider>
          }
        />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  )
}

export default Router

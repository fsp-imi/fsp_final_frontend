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
import AnalyticsScreen from "@/components/screens/analytics"
import ContestScreen from "@/components/screens/contest"
import Lk from "@/components/screens/lk"
import ClaimScreen from "@/components/screens/claim"
import AnalyticsTeamScreen from "@/components/screens/analytics-team"
import CreateClaim from "@/components/screens/create-claim"
import EmailVerificationScreen from "@/components/screens/email-verification"
import PasswordResetScreen from "@/components/screens/password-reset"
import PasswordResetSuccessScreen from "@/components/screens/password-reset-success"
import PasswordResetChangeScreen from "@/components/screens/password-reset-change"

import { Route, Routes } from "react-router-dom"
import PasswordResetWaitScreen from "@/components/screens/password-reset-wait"
import EmailVerificationNeedScreen from "@/components/screens/email-verification-need"

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
        <Route
          path="/analytics"
          element={
            <FiltersProvider>
              <AnalyticsScreen />
            </FiltersProvider>
          }
        />
        <Route
          path="/analytics/team"
          element={
            <FiltersProvider>
              <AnalyticsTeamScreen />
            </FiltersProvider>
          }
        />
        <Route path="/profile/federation" element={<FederationProfile />} />
        <Route path="/federations" element={<FederationsScreen />} />
        <Route path="/federations/:id" element={<FederationScreen />} />
        <Route path="/result-upload/:id" element={<ResultUploadScreen />} />
        <Route path="/lk" element={<Lk />} />
        <Route
          path="/email-verification"
          element={<EmailVerificationScreen />}
        />
        <Route path="/password-reset" element={<PasswordResetScreen />} />
        <Route
          path="/password-reset-change"
          element={<PasswordResetChangeScreen />}
        />
        <Route
          path="/password-reset-wait"
          element={<PasswordResetWaitScreen />}
        />
        <Route
          path="/email-verification-need"
          element={<EmailVerificationNeedScreen />}
        />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccessScreen />}
        />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/create-claim" element={<CreateClaim />} />
        <Route path="/claim/:id" element={<ClaimScreen />} />
        <Route path="/contest/:id" element={<ContestScreen />} />
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

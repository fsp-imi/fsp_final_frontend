import Router from "@/router/router.tsx"
import AuthProvider from "./providers/auth"

import "./index.css"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>
)

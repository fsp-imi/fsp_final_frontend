import Router from "@/router/router.tsx"
import AuthProvider from "./providers/auth"

import "./index.css"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/toaster"

const queryClient = new QueryClient({})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

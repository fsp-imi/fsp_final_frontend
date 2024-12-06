import Router from "@/router/router.tsx"
import AuthProvider from "./providers/auth"

import "./index.css"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  </QueryClientProvider>
)

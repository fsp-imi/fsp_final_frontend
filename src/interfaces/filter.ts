import { ReactNode } from "react"

export interface IFilter {
  id: number
  label: string
  isOpen: boolean
  children: ReactNode
}

export interface IFederation {
  id: number
  name: string
  email: string
  phone: string
  address: string
  // workTime: string
  agent?: number
  level: "REG" | "CEN"
}

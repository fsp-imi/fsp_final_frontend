export interface IAuthResponse {
  token: string
}

export interface IAuthCheckResponse {
  detail: boolean
}

export interface ILoginPassword {
  username: string
  password: string
}

export interface IRegistrationData extends ILoginPassword {
  first_name: string
  last_name: string
  email: string
  confirm_password: string
}

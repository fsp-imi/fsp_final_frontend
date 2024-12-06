export interface IAuthResponse {
  token: string
}

export interface IAuthCheckResponse {
  detail: boolean
}

export interface ILoginPassword {
  login: string
  password: string
}

export interface IRegistrationData extends ILoginPassword {
  fio: string
  email: string
  confirm_password: string
}

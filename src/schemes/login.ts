import { z } from "zod"

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Введите логин" })
    .max(100, { message: "Слишком длинный логин" }),
  password: z
    .string()
    .min(8, { message: "Минимальная длина пароля 8 символов" })
    .max(40, { message: "Пароль слишком длинный" }),
})

import { z } from "zod"

export const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "Введите имя" })
    .max(50, { message: "Слишком длинное имя" }),
  last_name: z
    .string()
    .min(1, { message: "Введите фамилию" })
    .max(50, { message: "Слишком длинная фамилия" }),
  username: z
    .string()
    .min(1, { message: "Введите логин" })
    .max(100, { message: "Слишком длинный логин" }),
  email: z
    .string()
    .min(1, { message: "Введите электронную почту" })
    .email("Введите корректный адрес электронной почты"),
})

import { z } from "zod"

export const federationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Введите название" })
    .max(50, { message: "Слишком длинное название" }),
  address: z
    .string()
    .min(1, { message: "Введите адрес" })
    .max(100, { message: "Слишком длинный адрес" }),
  phone: z
    .string()
    .min(1, { message: "Введите номер телефона" })
    .max(100, { message: "Слишком длинный логин" }),
  email: z
    .string()
    .min(1, { message: "Введите электронную почту" })
    .email("Введите корректный адрес электронной почты"),
  // workTime: z.string().min(1, "Введите время работы"),
})

import { z } from "zod"

export const registrationSchema = z
  .object({
    fio: z
      .string()
      .min(1, { message: "Введите ФИО" })
      .max(50, { message: "Слишком длинное ФИО" }),
    login: z
      .string()
      .min(1, { message: "Введите логин" })
      .max(100, { message: "Слишком длинный логин" }),
    email: z.string().email("Введите корректный адрес электронной почты"),
    password: z
      .string()
      .min(8, { message: "Минимальная длина пароля 8 символов" })
      .max(40, { message: "Пароль слишком длинный" }),
    confirm_password: z
      .string()
      .min(8, { message: "Минимальная длина пароля 8 символов" })
      .max(40, { message: "Пароль слишком длинный" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли не совпадают",
        path: ["confirm_password"],
      })
    }
  })

import { claimFormat } from "@/interfaces/claim"
import { z } from "zod"

export const claimSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Введите название" })
    .max(70, { message: "Слишком длинное название" }),
  start_time: z.date({ required_error: "Выберите дату начала" }),
  end_time: z.date({ required_error: "Выберите дату окончания" }),
  place: z.string().min(1, { message: "Введите электронную почту" }),
  format: z.nativeEnum(claimFormat, {
    required_error: "Выберите формат проведения соревнования",
  }),
  contesttype: z.string({ required_error: "Выберите уровень соревнования" }),
  contest_char: z.string({ required_error: "Выберите характер соревнования" }),
  sporttype: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Выберите вид спорта",
  }),
  discipline: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "Выберите дисциплины",
    }),
  agegroup: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Выберите возрастные группы",
  }),
})

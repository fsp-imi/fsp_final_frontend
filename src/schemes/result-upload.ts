import { z } from "zod"

export const resultUploadSchema = z.object({
  file: z.instanceof(File, { message: "Загрузите файл" }),
  header: z.string().min(1, { message: "Выберите заголовок" }),
  column_index: z.number({ required_error: "Выберите поле" }),
})

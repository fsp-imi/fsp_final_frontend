import { profileSchema } from "@/schemes/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  FormLabel,
  // FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useEffect } from "react"
// import { useMutation, useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"

const ResultUploadScreen = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  })

  const watchAllFields = form.watch()

  const sendDebouncedData = debounce((data) => {
    console.log("Sending data:", data)
    // Здесь ваш API вызов
  }, 1000)

  useEffect(() => {
    sendDebouncedData(watchAllFields)
  }, [watchAllFields])

  // const onSubmit = () => {
  //   // console.log(values)
  // }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center text-3xl font-medium bg-white rounded-3xl p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Загрузка результатов</h1>
          <Form {...form}>
            <form
              // onSubmit={null}
              className="w-auto h-auto flex flex-col gap-6"
            >
              <div className="grid w-full items-center gap-1.5">
                <FormLabel htmlFor="picture">
                  Результаты
                  <span className="text-slate-400">
                    {" "}
                    (&nbsp;.csv&nbsp;|&nbsp;.xls&nbsp;|&nbsp;.xlsx&nbsp;)
                  </span>
                </FormLabel>
                <Input id="picture" type="file" />
              </div>

              <h1 className="text-xl">Столбцы с данными</h1>
              <div className="flex gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <FormLabel htmlFor="picture">
                    Округ
                    <span className="text-slate-400"> ( номер столбца )</span>
                  </FormLabel>
                  <Input type="number" placeholder="-" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <FormLabel htmlFor="picture">
                    Регион
                    <span className="text-slate-400"> ( номер столбца )</span>
                  </FormLabel>
                  <Input type="number" placeholder="-" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <FormLabel htmlFor="picture">
                    Участники
                    <span className="text-slate-400"> ( номер столбца )</span>
                  </FormLabel>
                  <Input type="number" placeholder="-" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <FormLabel htmlFor="picture">
                    Баллы
                    <span className="text-slate-400"> ( номер столбца )</span>
                  </FormLabel>
                  <Input type="number" placeholder="-" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <FormLabel htmlFor="picture">
                    Место
                    <span className="text-slate-400"> ( номер столбца )</span>
                  </FormLabel>
                  <Input type="number" placeholder="-" />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ResultUploadScreen

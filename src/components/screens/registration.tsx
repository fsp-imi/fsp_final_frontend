import { registrationSchema } from "@/schemes/registration"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const RegistrationScreen = () => {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fio: "",
      login: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof registrationSchema>) => {
    console.log(values)
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[url('/registration.jpg')] bg-cover px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:max-w-[334px] h-auto flex flex-col gap-6 rounded-md bg-white shadow-md p-6"
        >
          {/* ФИО */}
          <FormField
            control={form.control}
            name="fio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ФИО</FormLabel>
                <FormControl>
                  <Input placeholder="Бочкарев Виктор Гаврильевич" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Логин */}
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="bochka41" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Электронная почта */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="viktor@mail.ru" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Пароль */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Повторный ввод пароля */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Регистрация</Button>

          <div className="w-full flex flex-row justify-between">
            <div className="underline cursor-pointer">Забыли пароль?</div>

            <Link to="/login" className="text-blue-600">
              Авторизация
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RegistrationScreen

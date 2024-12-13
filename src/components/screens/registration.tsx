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
import { useUserStore } from "@/store/user"

const RegistrationScreen = () => {
  const { register, error, isError } = useUserStore()

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof registrationSchema>) => {
    register(values)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[url('/registration.jpg')] bg-cover px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-auto h-auto flex flex-col gap-6 rounded-md bg-white shadow-md p-6"
        >
          <div className="text-2xl font-medium text-center">Регистрация</div>
          <div className="w-full flex flex-row flex-wrap gap-2 relative">
            {/* Имя */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[calc((100%-8px)/2)]">
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Иван" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Фамилия */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full  sm:w-[calc((100%-8px)/2)]">
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder="Иванов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Логин */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="ivan1" {...field} />
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
                  <Input placeholder="ivan@mail.ru" {...field} />
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
                {isError && <div className="text-red-500 text-sm">{error}</div>}
              </FormItem>
            )}
          />

          <Button type="submit">Регистрация</Button>

          <div className="w-full flex flex-row justify-between">
            <Link to={"/password-reset"} className="underline cursor-pointer">
              Забыли пароль?
            </Link>
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

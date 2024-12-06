import LoaderScreen from "../ui/loader-screen"

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
import { loginSchema } from "@/schemes/login"
import { Link } from "react-router-dom"
import { useUserStore } from "@/store/user.store"

const LoginScreen = () => {
  const { isLoading, login, error } = useUserStore()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login(values)
  }

  if (isLoading) return <LoaderScreen />

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[url('/registration.jpg')] bg-cover px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:max-w-[334px] h-auto flex flex-col gap-6 rounded-md bg-white shadow-md p-6"
        >
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
                {error}
              </FormItem>
            )}
          />

          <Button type="submit">Войти</Button>

          <div className="w-full flex flex-row justify-between">
            <div className="underline cursor-pointer">Забыли пароль?</div>

            <Link to="/registration" className="text-blue-600">
              Регистрация
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginScreen

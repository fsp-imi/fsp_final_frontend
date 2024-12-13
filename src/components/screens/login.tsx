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
import { useUserStore } from "@/store/user"

const LoginScreen = () => {
  const { isError, login, error } = useUserStore()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await login(values)
  }

  return (
    <div className="flex-1 relative flex flex-col justify-center items-center py-8 px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:max-w-[334px] h-auto flex flex-col gap-6 rounded-md bg-white shadow-md p-6"
        >
          <div className="text-2xl font-medium">Авторизация</div>

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
                {isError && <div className="text-red-500 text-sm">{error}</div>}
              </FormItem>
            )}
          />

          <Button type="submit">Войти</Button>

          <div className="w-full flex flex-row justify-between">
            <Link to={"/password-reset"} className="underline cursor-pointer">
              Забыли пароль?
            </Link>

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

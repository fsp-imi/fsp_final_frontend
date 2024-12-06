import Loader from "../loader"

import { profileSchema } from "@/schemes/profile"
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
} from "../form"
import { Input } from "../input"
import { Button } from "../button"
import { useUserStore } from "@/store/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UserService } from "@/services/user/user"
import { useEffect } from "react"

const ProfileForm = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get profile"],
    queryFn: UserService.getProfile,
  })

  const { setUser, isLoading: isAuthLoading } = useUserStore()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["change user"],
    mutationFn: UserService.changeProfile,
    onSuccess: (res) => setUser(res),
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    mutate(values)
  }

  useEffect(() => {
    if (user) form.reset(user)
  }, [user])

  if (isPending || isLoading || isAuthLoading) return <Loader />

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-auto h-auto flex flex-col gap-6"
      >
        <div className="text-2xl font-medium">Данные профиля</div>

        <div className="w-full flex flex-row flex-wrap gap-2">
          {/* Имя */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full sm:w-auto">
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
              <FormItem className="w-full sm:w-auto">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="ivan1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Логин */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input disabled placeholder="ivan1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  )
}

export default ProfileForm

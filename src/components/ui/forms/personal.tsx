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
import { Card } from "../card"
import { federalSchema } from "@/schemes/federal"

import InputMask from "react-input-mask";
import { Label } from "../label"

const PersonalForm = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get profile"],
    queryFn: UserService.getProfile,
  })

  const { setUser, isLoading: isAuthLoading } = useUserStore()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  })

  const form2 = useForm<z.infer<typeof federalSchema>>({
    resolver: zodResolver(federalSchema),
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
    <Card className="py-8 px-10 rounded-3xl flex flex-row w-auto bg-white gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-auto h-auto flex flex-col gap-6"
        >
          <div className="text-2xl font-medium">Данные федерации</div>

          {/* Название */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название федерации</FormLabel>
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
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input placeholder="ivan1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Номер телефона */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  placeholder="+7 (999) 999-99-99"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {(inputProps) => <Input {...inputProps} />}
                </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Адрес */}
          <FormField
            control={form.control}
            name="Адрес"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Адрес" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Время работы */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Время работы</FormLabel>
                <FormControl>
                <InputMask
                  mask="99:99 - 99:99"
                  placeholder="08:00 - 18:00"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {(inputProps) => <Input {...inputProps} />}
                </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Уровень */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Уровень</FormLabel>
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

      <Form {...form2}>
        <form action="" className="flex flex-col gap-4">
          <div className="text-2xl font-medium">Фото профиля</div>
          <div className="bg-blue-600 rounded-full h-24 w-24"></div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" />
          </div>
          <Button>Сменить</Button>
        </form>
      </Form>
    </Card>
  )
}

export default PersonalForm

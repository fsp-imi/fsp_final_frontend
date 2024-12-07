import Loader from "../loader"
import InputMask from "@mona-health/react-input-mask"

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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FC, useEffect } from "react"
import { Card } from "../card"
import { federationSchema } from "@/schemes/federation"
import { IFederation } from "@/interfaces/federation"
import { FederationService } from "@/services/federation/federation"

interface IFederationFormProps {
  federation: IFederation
}

const FederationForm: FC<IFederationFormProps> = ({ federation }) => {
  const form = useForm<z.infer<typeof federationSchema>>({
    resolver: zodResolver(federationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  const form2 = useForm<z.infer<typeof federationSchema>>({
    resolver: zodResolver(federationSchema),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ["change federation"],
    mutationFn: FederationService.changeProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get federation"],
      }),
  })

  const onSubmit = (values: z.infer<typeof federationSchema>) => {
    console.log(values)
    mutate({ id: federation.id, ...values })
  }

  useEffect(() => {
    if (federation) form.reset(federation)
  }, [federation])

  if (isPending) return <Loader />

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название федерации</FormLabel>
                <FormControl>
                  <Input placeholder="Якутск" {...field} />
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
                    <Input />
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Адрес */}
          <FormField
            control={form.control}
            name="address"
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
          {/* <FormField
            control={form.control}
            name="workTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Время работы</FormLabel>
                <FormControl>
                  <InputMask
                    mask="99:99-99:99"
                    placeholder="08:00-18:00"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Input />
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Уровень */}
          <FormItem>
            <FormLabel>Уровень</FormLabel>
            <FormControl>
              <Input disabled placeholder="ivan1" />
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type="submit">Сохранить</Button>
        </form>
      </Form>

      <Form {...form2}>
        <form action="" className="flex flex-col gap-2">
          <div className="text-2xl font-medium">Фото профиля</div>
          <div className="bg-blue-600 rounded-full h-24 w-24"></div>
          <Button>Сменить</Button>
        </form>
      </Form>
    </Card>
  )
}

export default FederationForm

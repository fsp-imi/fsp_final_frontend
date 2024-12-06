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

const ProfileForm = () => {
  const { user } = useUserStore()

  console.log(user)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-auto h-auto flex flex-col gap-6"
      >
        <div className="text-2xl font-medium">Данные профиля</div>

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
                <Input placeholder="ivan1" {...field} />
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

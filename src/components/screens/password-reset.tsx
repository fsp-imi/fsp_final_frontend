import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "@/services/auth/auth"
import Loader from "../ui/loader"
import { useNavigate } from "react-router-dom"

const PasswordResetScreen = () => {
  const [email, setEmail] = useState<string>('')

  const navigate = useNavigate()

  const {mutate, isPending} = useMutation({
    mutationKey: ['reset password'],
    mutationFn: async () => await AuthService.resetPassword(email),
    onSuccess: () => navigate('/password-reset-wait')
  })

  if (isPending) return <Loader />

  return (
    <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-2xl">
        Для восстановления вашего пароля введите адрес вашей электронной почты,
        которая зарегистрирована в системе.
      </div>
      <div className="flex flex-row justify-start gap-6">
        <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-[200px]"
          placeholder="Ваша электронная почта"
        />
        <Button onClick={() => mutate()}>Восстановить</Button>
      </div>
    </div>
  )
}

export default PasswordResetScreen

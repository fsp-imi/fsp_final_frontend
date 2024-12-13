import Loader from "../ui/loader"

import { AuthService } from "@/services/auth/auth"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

const EmailVerificationScreen = () => {
  const [text, setText] = useState<string>("Загрузка")

  const [searchParams] = useSearchParams()

  const {mutate, isPending} = useMutation({
    mutationKey: ['verify email'],
    mutationFn: async () => await AuthService.verifyEmail(searchParams.get("uuid") || "", searchParams.get("token") || ""),
    onSuccess: () => {
      setText("Ваша электронная почта подтверждена!")
    },
    onError: () => {setText("Не удалось подтвердить электронную почту!")}
  })

  useEffect(() => {mutate()}, [searchParams.toString()])

  if (isPending) return <Loader />

  return (
    <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-2xl">{text}</div>

      <Link className="text-indigo-600" to="/login">
        Перейти на страницу авторизации
      </Link>
    </div>
  )
}

export default EmailVerificationScreen

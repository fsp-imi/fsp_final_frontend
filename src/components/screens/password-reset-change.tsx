import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AuthService } from "@/services/auth/auth"
import Loader from "../ui/loader"

const PasswordResetChangeScreen = () => {
    const [password1, setPassword1] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const {mutate: check, isPending: isCheckPending} = useMutation({
        mutationKey: ['check password token'],
        mutationFn: async () => await AuthService.checkToken(searchParams.get('token') || ""),
        
    })

    const {mutate, isPending} = useMutation({
        mutationKey: ['change password'],
        mutationFn: async () => await AuthService.changePassword(password1, searchParams.get('token') || ""),
        onSuccess: () => navigate('/password-reset-success'),
        onError: (e: any) => {
            setErrors(e.response.data.details)
            console.log(e)
        } ,
    })

    useEffect(() => {
        check()
    }, [searchParams.toString()])

    useEffect(() => {
        if (password1 !== password2) setErrors(["Пароли не совпадают"])
            else setErrors([])
    
    }, [password1, password2])

    if (isPending || isCheckPending) return <Loader />

    return <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
    <div className="text-2xl">
      Для восстановления вашего пароля введите адрес вашей электронной почты,
      которая зарегистрирована в системе.
    </div>
    <div className="flex flex-col justify-start gap-6">
      <Input
      required
      value={password1}
      onChange={(e) => setPassword1(e.target.value)}
        type="password"
        className="w-[250px]"
        placeholder="Новый пароль"
      />
      <Input
      required
      value={password2}
      onChange={(e) => setPassword2(e.target.value)}
        type="password"
        className="w-[250px]"
        placeholder="Подтвердите новый пароль"
      />
      <div className="flex flex-col gap-1">
      {errors.length > 0 ? errors.map(error => <div className="text-red-500">{error}</div>) : null}</div>
      <Button onClick={() => mutate()} className="w-[250px]">Изменить пароль</Button>
    </div>
  </div>
}

export default PasswordResetChangeScreen
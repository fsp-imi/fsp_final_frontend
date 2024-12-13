import { Button } from "../ui/button"
import { Input } from "../ui/input"

const PasswordResetScreen = () => {
  return (
    <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-2xl">
        Для восстановления вашего пароля введите адрес вашей электронной почты,
        которая зарегистрирована в системе.
      </div>
      <div className="flex flex-row justify-start gap-6">
        <Input
          type="email"
          className="w-[200px]"
          placeholder="Ваша электронная почта"
        />
        <Button>Восстановить</Button>
      </div>
    </div>
  )
}

export default PasswordResetScreen

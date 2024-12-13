import { Link } from "react-router-dom"

const EmailVerificationNeedScreen = () => {
  return (
    <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-2xl">
        Вы успешно зарегистрированы, на вашу почту отправлено письмо с ссылкой
        на подтверждение вашей почты!
      </div>

      <Link className="text-indigo-600" to="/login">
        Перейти на страницу авторизации
      </Link>
    </div>
  )
}

export default EmailVerificationNeedScreen

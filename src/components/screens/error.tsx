import { Link } from "react-router-dom"

const ErrorScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-3xl font-medium">
      К сожалению на сайте возникла ошибка... :( <br />
      <Link className="text-indigo-600" to="/">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default ErrorScreen

import { Link } from "react-router-dom"

const NotFoundScreen = () => {
  return (
    <>
      <div className="w- h-full flex flex-col justify-center items-center text-3xl font-medium bg-white rounded-3xl p-10">
        Такой страницы не существует. :(
        <Link className="text-indigo-600 text-2xl" to="/">
          Вернуться на главную
        </Link>{" "}
      </div>
    </>
  )
}

export default NotFoundScreen

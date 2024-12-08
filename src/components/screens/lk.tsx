import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import AdminClaims from "../ui/admin-claims"
import { useUserStore } from "@/store/user"
import Loader from "../ui/loader"
import Claims from "../ui/claims"
import { Link } from "react-router-dom"

const Lk = () => {
  const { user, isLoading } = useUserStore()

  if (isLoading) return <Loader />

  if (user)
    return (
      <div className="w-full flex flex-col px-10 py-8 bg-white rounded-3xl gap-8">
        <div className="text-3xl font-semibold">
          {user.is_staff ? "Федеральный" : "Региональный"} личный кабинет
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-2xl font-medium">Заявки</div>

          <div className="w-full flex justify-between items-center">
            <div className="w-[240px] relative">
              <Input placeholder="Поиск" />
              <Search className="absolute right-2 top-1.5" />
            </div>

            {!user?.is_staff && (
              <Link to="/create-claim">
                {" "}
                <Button>Добавить</Button>
              </Link>
            )}
          </div>

          {user.is_staff ? <AdminClaims /> : <Claims />}
        </div>
      </div>
    )
}

export default Lk

import ProfileForm from "../ui/forms/profile"
import Loader from "../ui/loader"

import { useUserStore } from "@/store/user"

const ProfileScreen = () => {
  const { isLoading } = useUserStore()

  if (isLoading) return <Loader />

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 bg-white rounded-3xl py-8 px-10">
      <div className="text-3xl">Профиль пользователя</div>
      
      <ProfileForm />
    </div>
  )
}

export default ProfileScreen

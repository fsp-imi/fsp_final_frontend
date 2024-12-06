import ProfileForm from "../ui/forms/profile"
import Loader from "../ui/loader"

import { useUserStore } from "@/store/user"

const ProfileScreen = () => {
  const { isLoading } = useUserStore()

  if (isLoading) return <Loader />

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="py-8 px-10 rounded-3xl flex flex-col w-auto bg-white gap-8">
        <ProfileForm />
      </div>
    </div>
  )
}

export default ProfileScreen

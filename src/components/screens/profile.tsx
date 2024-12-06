import ProfileForm from "../ui/forms/profile"
import Loader from "../ui/loader"

import { useUserStore } from "@/store/user"

const ProfileScreen = () => {
  const { isLoading } = useUserStore()

  if (isLoading) return <Loader />

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <ProfileForm />
    </div>
  )
}

export default ProfileScreen

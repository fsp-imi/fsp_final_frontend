import FederationForm from "../ui/forms/federation"
import Loader from "../ui/loader"

import { useQuery } from "@tanstack/react-query"
import { FederationService } from "@/services/federation/federation"

const FederationProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get my federation"],
    queryFn: FederationService.getMy,
  })

  return (
    <div className="bg-white rounded-3xl px-10 py-8 flex flex-col gap-8">
      <div className="text-3xl">Профиль федерации</div>

      {isLoading ? <Loader /> : data && <FederationForm federation={data} />}
    </div>
  )
}

export default FederationProfile

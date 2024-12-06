import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode } from "react"
import { SubscriptionService } from "../services/subscription/subscription.service"
import { ISubsciption } from "../interfaces/subscription"
import LoaderScreen from "@/components/ui/loader-screen"
import Loader from "@/components/ui/loader"

interface ISubscriptionContext {
  subscriptions: ISubsciption[]
  subscribe: any
  unsubscribe: any
}

export const SubscriptionContext = createContext<ISubscriptionContext>({
  subscriptions: [],
  subscribe: () => {},
  unsubscribe: () => {},
})

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  const { data: subscriptions, isLoading: isSubscriptionsLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: SubscriptionService.getAll,
  })

  const { mutate: subscribe, isPending: isSubscribeLoading } = useMutation({
    mutationKey: ["add subscription"],
    mutationFn: SubscriptionService.subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  const { mutate: unsubscribe, isPending: isUnSubscribeLoading } = useMutation({
    mutationKey: ["delete subscription"],
    mutationFn: SubscriptionService.unsubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  if (isSubscriptionsLoading || isSubscribeLoading || isUnSubscribeLoading)
    return <Loader />

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions: subscriptions || [],
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export default SubscriptionProvider

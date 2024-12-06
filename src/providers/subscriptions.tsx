import Loader from "@/components/ui/loader"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode, useEffect } from "react"
import { SubscriptionService } from "../services/subscription/subscription.service"
import { ISubsciption } from "../interfaces/subscription"
import { useToast } from "@/hooks/use-toast"
import { useUserStore } from "@/store/user"
import { NotificationService } from "@/services/notification/notification.service"

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

  const { toast } = useToast()
  const { isAuth } = useUserStore()

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

  const {
    data: notifications,
    isLoading: isNotificationsLoading,
    isSuccess: isNotificationsSuccess,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => (isAuth ? NotificationService.getAll() : null),
  })

  useEffect(() => {
    if (notifications)
      notifications.map((notification) => {
        toast({
          description: notification.text,
        })
      })
  }, [isNotificationsSuccess])

  if (
    isSubscriptionsLoading ||
    isSubscribeLoading ||
    isUnSubscribeLoading ||
    isNotificationsLoading
  )
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

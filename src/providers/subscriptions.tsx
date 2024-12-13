import Loader from "@/components/ui/loader"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createContext, ReactNode, useEffect } from "react"
// import { SubscriptionService } from "../services/subscription/subscription.service"
// import { ISubsciption } from "../interfaces/subscription"
import { useToast } from "@/hooks/use-toast"
import { useUserStore } from "@/store/user"
import { NotificationService } from "@/services/notification/notification.service"
import { ToastAction } from "@/components/ui/toast"

interface ISubscriptionContext {
  // subscriptions: ISubsciption[]
  // subscribe: any
  // unsubscribe: any
}

export const SubscriptionContext = createContext<ISubscriptionContext>({
  // subscriptions: [],
  // subscribe: () => {},
  // unsubscribe: () => {},
})

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  // const queryClient = useQueryClient()

  const { toast } = useToast()
  const { isAuth } = useUserStore()

  // const { data: subscriptions, isLoading: isSubscriptionsLoading } = useQuery({
  //   queryKey: ["subscriptions"],
  //   queryFn: SubscriptionService.getAll,
  // })

  // const { mutate: subscribe, isPending: isSubscribeLoading } = useMutation({
  //   mutationKey: ["add subscription"],
  //   mutationFn: SubscriptionService.subscribe,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
  //   },
  // })

  const { mutate: deleteNotification, isPending: isDeleteLoading } =
    useMutation({
      mutationKey: ["delete notification"],
      mutationFn: NotificationService.delete,
    })

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
    queryKey: ["notifications", isAuth],
    queryFn: () => (isAuth ? NotificationService.getAll() : null),
  })

  useEffect(() => {
    if (notifications)
      notifications.map((notification) => {
        console.log(notification)
        toast({
          title: "Уведомление",
          description: notification.text,
          action: (
            <ToastAction
              altText="Удалить уведомление"
              onClick={() => deleteNotification(notification.id)}
            >
              Удалить уведомление
            </ToastAction>
          ),
        })
      })
  }, [isNotificationsLoading, notifications])

  if (isNotificationsLoading || isDeleteLoading) return <Loader />

  return (
    <SubscriptionContext.Provider
      value={
        {
          // subscriptions: subscriptions || [],
          // subscribe,
          // unsubscribe,
        }
      }
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export default SubscriptionProvider

import { instance } from "../../api/api.interceptor"
import { ISubsciption } from "../../interfaces/subscription"

export const SubscriptionService = {
  async getAll(): Promise<ISubsciption[]> {
    const response = await instance({ url: `/subscriptionapi/subscriptions/` })

    return response.data
  },

  async subscribe(data: string[] | number[]): Promise<boolean> {
    const response = await instance({
      url: "/subscriptionapi/subscribe/",
      method: "POST",
      data: {
        subscribe: data,
      },
    })

    return response.data.result
  },

  async unsubscribe(id: string | number): Promise<boolean> {
    const response = await instance({
      url: `/subscriptionapi/subscriptions/delete/${id}/`,
      method: "DELETE",
    })

    return response.data.result
  },
}

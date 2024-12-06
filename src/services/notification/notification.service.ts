import { instance } from "../../api/api.interceptor"
import { INotification } from "../../interfaces/notification"

export const NotificationService = {
  async getAll(): Promise<INotification[]> {
    const response = await instance({
      url: "notificationapi/notifications/",
      method: "GET",
    })

    return response.data
  },

  async delete(id: string | number) {
    const response = await instance({
      url: `notificationapi/notifications/delete/${id}/`,
      method: "DELETE",
    })

    return response.data
  },
}

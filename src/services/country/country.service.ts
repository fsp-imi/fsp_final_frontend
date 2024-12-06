import { instance } from "../../api/api.interceptor"
import { ICountry } from "../../interfaces/country"

export const CountryService = {
  async getAll(): Promise<ICountry[]> {
    const response = await instance({
      url: `/countryapi/countries`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<ICountry> {
    const response = await instance({
      url: `/countryapi/countries/${id}`,
      method: "GET",
    })

    return response.data
  },
}

import axios, { AxiosRequestConfig } from 'axios'
import { formattedDate } from '@/shared/utils/Utils'
import { WebappStore } from '@/app/store/webappStore'
import { TTransactionsFormData } from '..'
import { TTelegramCompaniesData, TTelegramProductsData } from './webapp.types'

export const fetchTelegramProducts = async (): Promise<TTelegramProductsData> => {
  const { webappUserId } = WebappStore()
  if (webappUserId) {
    const config: AxiosRequestConfig = {
      url: 'https://stockroom.karsoft.uz/api/telegram/products',
      method: 'GET',
      auth: {
        username: webappUserId.toString(),
        password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
      },
    }
    const res = await axios(config)
    return res.data
  }
  throw new Error('User id is not found')
}

export const fetchTelegramCompanies = async (): Promise<TTelegramCompaniesData> => {
  const { webappUserId } = WebappStore()
  if (webappUserId) {
    const config: AxiosRequestConfig = {
      url: 'https://stockroom.karsoft.uz/api/telegram/companies',
      method: 'GET',
      auth: {
        username: webappUserId.toString(),
        password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
      },
    }
    const res = await axios(config)
    return res.data
  }
  throw new Error('User ID is not found')
}

export const createTelegramTransaction = async (formData: TTransactionsFormData) => {
  const { webappUserId } = WebappStore()
  const config: AxiosRequestConfig = {
    url: '/telegram/transactions',
    method: 'POST',
    data: {
      ...formData,
      date: formattedDate(formData?.date),
      transaction_type: 2,
    },
    auth: {
      username: webappUserId.toString(),
      password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
    },
  }

  const res = await axios(config)
  return res.data
}

import { axiosInterceptor } from '@/shared/lib/api'
import axios, { AxiosRequestConfig } from 'axios'
import { TTelegramTransactionsFormData } from './webapp.types'
import { formattedDate } from '@/shared/utils/Utils'

export const fetchTelegramProducts = async () => {
  const res = await axiosInterceptor.get('/telegram/products')
  return res.data
}

export const fetchTelegramCompanies = async () => {
  const res = await axiosInterceptor.get('/telegram/companies')
  return res.data
}

export const createTelegramTransaction = async (formData: TTelegramTransactionsFormData) => {
  const config: AxiosRequestConfig = {
    url: '/telegram/transactions',
    method: 'POST',
    data: {
      ...formData,
      date: formattedDate(formData?.date),
      transaction_type: 2,
    },
    auth: {
      username: formData.userId.toString(),
      password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
    },
  }

  const res = await axios(config)
  return res.data
}

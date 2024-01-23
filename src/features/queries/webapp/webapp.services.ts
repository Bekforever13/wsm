import axios, { AxiosRequestConfig } from 'axios'
import { formattedDate } from '@/shared/utils/Utils'
import { WebappStore } from '@/app/store/webappStore'
import { TTransactionsFormData } from '..'

const { webappUserId } = WebappStore()

export const fetchTelegramProducts = async () => {
  const config: AxiosRequestConfig = {
    url: '/telegram/products',
    method: 'GET',
    auth: {
      username: webappUserId.toString(),
      password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
    },
  }
  const res = await axios(config)
  return res.data
}

export const fetchTelegramCompanies = async () => {
  const config: AxiosRequestConfig = {
    url: '/telegram/companies',
    method: 'GET',
    auth: {
      username: webappUserId.toString(),
      password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
    },
  }
  const res = await axios(config)
  return res.data
}

export const createTelegramTransaction = async (formData: TTransactionsFormData) => {
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

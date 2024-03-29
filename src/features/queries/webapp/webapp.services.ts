import axios, { AxiosRequestConfig } from 'axios'
import { TStorage, TTransactionsFormData } from '..'
import { TTelegramCompaniesData, TTelegramProductsData } from './webapp.types'

export const fetchTelegramProducts = async (id: number): Promise<TTelegramProductsData> => {
  if (id) {
    const config: AxiosRequestConfig = {
      url: 'https://stockroom.karsoft.uz/api/telegram/products',
      method: 'GET',
      auth: {
        username: id.toString(),
        password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
      },
    }
    const res = await axios(config)
    return res.data
  }
  throw new Error('User id is not found')
}

export const fetchStorage = async (id: number): Promise<{ data: TStorage[] }> => {
  if (id) {
    const config: AxiosRequestConfig = {
      url: 'https://stockroom.karsoft.uz/api/telegram/stockrooms',
      method: 'GET',
      auth: {
        username: id.toString(),
        password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
      },
    }
    const res = await axios(config)
    return res.data
  }
  throw new Error('User id is not found')
}

export const fetchTelegramCompanies = async (id: number): Promise<TTelegramCompaniesData> => {
  if (id) {
    const config: AxiosRequestConfig = {
      url: 'https://stockroom.karsoft.uz/api/telegram/companies',
      method: 'GET',
      auth: {
        username: id.toString(),
        password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
      },
    }
    const res = await axios(config)
    return res.data
  }
  throw new Error('User ID is not found')
}

export const createTelegramTransaction = async (formData: TTransactionsFormData) => {
  const config: AxiosRequestConfig = {
    url: 'https://stockroom.karsoft.uz/api/telegram/transactions/selling',
    method: 'POST',
    data: {
      ...formData,
      transaction_type: 2,
    },
    auth: {
      username: formData?.user_id?.toString() ?? '',
      password: '$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y',
    },
  }

  const res = await axios(config)
  return res.data
}

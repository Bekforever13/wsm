import { axiosInterceptor } from '@/shared/lib/api'
import { TTransactionsFormData } from './transactions.types'

export const fetchTransactionsIncome = async () => {
  const res = await axiosInterceptor.get('/transactions/coming')
  return res.data
}

export const createTransactionsIncome = async (formData: TTransactionsFormData) => {
  const res = await axiosInterceptor.post('/transactions/coming', formData)
  return res.data
}

export const fetchTransactionsSelling = async () => {
  const res = await axiosInterceptor.get('/transactions/selling')
  return res.data
}

export const createTransactionsSelling = async (formData: TTransactionsFormData) => {
  const res = await axiosInterceptor.post('/transactions/selling', formData)
  return res.data
}

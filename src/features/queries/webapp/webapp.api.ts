import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TTransactionsError } from '..'
import {
  createTelegramTransaction,
  fetchTelegramCompanies,
  fetchTelegramProducts,
} from './webapp.services'

const useGetTelegramProducts = (id: number) => {
  return useQuery({
    queryFn: () => fetchTelegramProducts(id),
    queryKey: ['products', id],
    refetchInterval: 1000,
  })
}

const useGetTelegramCompanies = (id: number) => {
  return useQuery({
    queryFn: () => fetchTelegramCompanies(id),
    queryKey: ['companies', id],
    refetchInterval: 1000,
  })
}

const useCreateTelegramTransaction = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createTelegramTransaction,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['transactions'] })
      client.invalidateQueries({ queryKey: ['storage'] })
      message.success(t('transactionsMessageCreateSuccess'))
    },
    onError: (err: TTransactionsError) => message.error(err?.response?.data?.data),
  })
}

export { useGetTelegramProducts, useCreateTelegramTransaction, useGetTelegramCompanies }

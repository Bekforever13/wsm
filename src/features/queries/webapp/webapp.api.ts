import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TTransactionsError } from '..'
import {
  createTelegramTransaction,
  fetchTelegramCompanies,
  fetchTelegramProducts,
} from './webapp.services'
import { WebappStore } from '@/app/store/webappStore'

const useGetTelegramProducts = () => {
  const { webappUserId } = WebappStore((s) => s)
  return useQuery({
    queryFn: () => fetchTelegramProducts(),
    queryKey: ['products', webappUserId],
    refetchInterval: 1000,
  })
}

const useGetTelegramCompanies = () => {
  const { webappUserId } = WebappStore((s) => s)
  return useQuery({
    queryFn: () => fetchTelegramCompanies(),
    queryKey: ['companies', webappUserId],
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

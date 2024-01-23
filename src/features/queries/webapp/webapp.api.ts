import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TTransactionsError } from '..'
import {
  createTelegramTransaction,
  fetchTelegramCompanies,
  fetchTelegramProducts,
} from './webapp.services'

const useGetTelegramProducts = () =>
  useQuery({
    queryFn: () => fetchTelegramProducts(),
    queryKey: ['products'],
  })
const useGetTelegramCompanies = () =>
  useQuery({
    queryFn: () => fetchTelegramCompanies(),
    queryKey: ['companies'],
  })

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

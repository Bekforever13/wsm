import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchTransactionsIncome,
  createTransactionsIncome,
  fetchTransactionsSelling,
  createTransactionsSelling,
} from './transactions.services'
import { useTranslation } from 'react-i18next'
import { TTransactionsError } from '..'

const useGetTransactionsIncome = () =>
  useQuery({
    queryFn: () => fetchTransactionsIncome(),
    queryKey: ['transactions_income'],
  })

const useCreateTransactionsIncome = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createTransactionsIncome,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['transactions_income'] })
      client.invalidateQueries({ queryKey: ['storage'] })
      message.success(t('transactionsMessageCreateSuccess'))
    },
    onError: (err: TTransactionsError) => message.error(err?.response?.data?.data),
  })
}
const useGetTransactionsSelling = () =>
  useQuery({
    queryFn: () => fetchTransactionsSelling(),
    queryKey: ['transactions_selling'],
  })

const useCreateTransactionsSelling = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createTransactionsSelling,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['transactions_selling'] })
      client.invalidateQueries({ queryKey: ['storage'] })
      message.success(t('transactionsMessageCreateSuccess'))
    },
    onError: (err: TTransactionsError) => message.error(err?.response?.data?.data),
  })
}

export {
  useGetTransactionsIncome,
  useCreateTransactionsIncome,
  useGetTransactionsSelling,
  useCreateTransactionsSelling,
}

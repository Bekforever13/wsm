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

const useGetTransactionsIncome = (branchId: number) =>
  useQuery({
    queryFn: () => fetchTransactionsIncome(branchId),
    queryKey: ['transactions_income', branchId],
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
const useGetTransactionsSelling = (branchId: number) =>
  useQuery({
    queryFn: () => fetchTransactionsSelling(branchId),
    queryKey: ['transactions_selling', branchId],
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

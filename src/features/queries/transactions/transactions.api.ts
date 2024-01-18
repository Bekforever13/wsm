import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createTransactions,
	fetchTransactions,
	editTransactions,
	deleteTransactions,
} from './transactions.services'
import { useTranslation } from 'react-i18next'

const useGetTransactions = () =>
	useQuery({
		queryFn: () => fetchTransactions(),
		queryKey: ['transactions'],
	})

const useCreateTransactions = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: createTransactions,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['transactions'] })
			message.success(t('transactionsMessageCreateSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании транзакции'),
	})
}
const useEditTransactions = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: editTransactions,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['transactions'] })
			message.success(t('transactionsMessageEditSuccess'))
		},
		onError: () =>
			message.error('Произошла ошибка при редактировании транзакции'),
	})
}
const useDeleteTransactions = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: deleteTransactions,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['transactions'] })
			message.success(t('transactionsMessageDeleteSuccess'))
		},
		onError: () => message.error('Произошла ошибка при удалении транзакции'),
	})
}

export {
	useGetTransactions,
	useCreateTransactions,
	useEditTransactions,
	useDeleteTransactions,
}

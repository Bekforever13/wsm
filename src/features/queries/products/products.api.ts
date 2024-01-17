import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createProducts,
	deleteProducts,
	editProducts,
	fetchProducts,
} from './products.services'
import { useTranslation } from 'react-i18next'

const useGetProducts = () =>
	useQuery({
		queryFn: () => fetchProducts(),
		queryKey: ['products'],
	})

const useCreateProduct = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: createProducts,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['products'] })
			message.success(t('productsMessageCreateSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании товара'),
	})
}
const useEditProduct = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: editProducts,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['products'] })
			message.success(t('productsMessageEditSuccess'))
		},
		onError: () => message.error('Произошла ошибка при редактировании товара'),
	})
}
const useDeleteProduct = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: deleteProducts,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['products'] })
			message.success(t('productsMessageDeleteSuccess'))
		},
		onError: () => message.error('Произошла ошибка при удалении товара'),
	})
}

export { useGetProducts, useCreateProduct, useEditProduct, useDeleteProduct }

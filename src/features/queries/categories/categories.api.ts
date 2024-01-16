import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createCategory,
	deleteCategory,
	editCategory,
	fetchCategories,
} from './categories.services'
import { useTranslation } from 'react-i18next'

const useGetCategories = () =>
	useQuery({
		queryFn: () => fetchCategories(),
		queryKey: ['categories'],
	})

const useCreateCategory = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['categories'] })
			message.success(t('categoryMessageCreateSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании категории'),
	})
}
const useEditCategory = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: editCategory,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['categories'] })
			message.success(t('categoryMessageEditSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании категории'),
	})
}
const useDeleteCategory = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['categories'] })
			message.success(t('categoryMessageDeleteSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании категории'),
	})
}

export {
	useGetCategories,
	useCreateCategory,
	useEditCategory,
	useDeleteCategory,
}

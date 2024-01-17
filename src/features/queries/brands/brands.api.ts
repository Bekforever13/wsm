import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createBrand,
	deleteBrand,
	editBrand,
	fetchBrands,
} from './brands.services'
import { useTranslation } from 'react-i18next'

const useGetBrands = () =>
	useQuery({
		queryFn: () => fetchBrands(),
		queryKey: ['brands'],
	})

const useCreateBrand = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: createBrand,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['brands'] })
			message.success(t('brandsMessageCreateSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании категории'),
	})
}
const useEditBrand = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: editBrand,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['brands'] })
			message.success(t('brandsMessageEditSuccess'))
		},
		onError: () => message.error('Произошла ошибка при редактировании бренда'),
	})
}
const useDeleteBrand = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: deleteBrand,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['brands'] })
			message.success(t('brandsMessageDeleteSuccess'))
		},
		onError: () => message.error('Произошла ошибка при удалении бренда'),
	})
}

export { useGetBrands, useCreateBrand, useEditBrand, useDeleteBrand }

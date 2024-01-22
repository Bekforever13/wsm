import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
	createCompany,
	deleteCompany,
	editCompany,
	fetchCompanies,
} from './companies.services'

const useGetCompanies = () =>
	useQuery({
		queryFn: () => fetchCompanies(),
		queryKey: ['companies'],
	})

const useCreateCompany = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: createCompany,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['companies'] })
			message.success(t('companiesMessageCreateSuccess'))
		},
		onError: () => message.error('Произошла ошибка при создании компании'),
	})
}
const useEditCompany = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: editCompany,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['companies'] })
			message.success(t('companiesMessageEditSuccess'))
		},
		onError: () =>
			message.error('Произошла ошибка при редактировании компании'),
	})
}
const useDeleteCompany = () => {
	const client = useQueryClient()
	const { t } = useTranslation()
	return useMutation({
		mutationFn: deleteCompany,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['companies'] })
			message.success(t('companiesMessageDeleteSuccess'))
		},
		onError: () => message.error('Произошла ошибка при удалении компании'),
	})
}

export { useGetCompanies, useCreateCompany, useEditCompany, useDeleteCompany }

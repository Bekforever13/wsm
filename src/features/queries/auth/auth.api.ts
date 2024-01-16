import { message } from 'antd'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchAuthLogin, fetchAuthLogout } from './auth.services'

const useAuthLoginMutation = () => {
	const client = useQueryClient()
	return useMutation({
		mutationFn: fetchAuthLogin,
		onSuccess: res => {
			localStorage.setItem('access_token_wsm', res.token)
			client.invalidateQueries({ queryKey: ['auth'] })
			message.success('Добро пожаловать')
		},
		onError: () => message.error('Произошла ошибка при авторизации'),
	})
}
const useAuthLogoutMutation = () => {
	const client = useQueryClient()
	return useMutation({
		mutationFn: fetchAuthLogout,
		onSuccess: () => {
			localStorage.removeItem('access_token_wsm')
			client.invalidateQueries({ queryKey: ['auth'] })
		},
		onError: () => message.error('Произошла ошибка при авторизации'),
	})
}

export { useAuthLoginMutation, useAuthLogoutMutation }

import { axiosInterceptor } from '@/shared/lib/api'
import { TLogin } from './auth.types'

export const fetchAuthLogin = async (values: TLogin): Promise<any> => {
	const res = await axiosInterceptor.post('/login', values)
	return res.data
}

export const fetchAuthLogout = async () => {
	const res = await axiosInterceptor.post('/logout')
	return res.data
}

import { axiosInterceptor } from '@/shared/lib/api'

export const fetchStorage = async () => {
	const res = await axiosInterceptor.get('/stockrooms')
	return res.data
}

import { axiosInterceptor } from '@/shared/lib/api'
import { TBrand, TBrandFormData } from './brands.types'

export const fetchBrands = async () => {
	const res = await axiosInterceptor.get('/brands')
	return res.data
}

export const createBrand = async (formData: TBrandFormData) => {
	const res = await axiosInterceptor.post('/brands', formData)
	return res.data
}

export const editBrand = async (formData: TBrand) => {
	const res = await axiosInterceptor.put(`/brands/${formData.id}`, {
		name: formData.name,
	})
	return res.data
}

export const deleteBrand = async (id: number) => {
	const res = await axiosInterceptor.delete(`/brands/${id}`)
	return res.data
}

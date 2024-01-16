import { axiosInterceptor } from '@/shared/lib/api'
import { TCategory, TCategoryFormData } from './categories.types'

export const fetchCategories = async () => {
	const res = await axiosInterceptor.get('/categories')
	return res.data
}

export const createCategory = async (formData: TCategoryFormData) => {
	const res = await axiosInterceptor.post('/categories', formData)
	return res.data
}

export const editCategory = async (formData: TCategory) => {
	const res = await axiosInterceptor.put(`/categories/${formData.id}`, {
		name: formData.name,
	})
	return res.data
}

export const deleteCategory = async (id: number) => {
	const res = await axiosInterceptor.delete(`/categories/${id}`)
	return res.data
}

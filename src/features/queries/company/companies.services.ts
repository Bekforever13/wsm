import { axiosInterceptor } from '@/shared/lib/api'
import { TCompany, TCompanyFormData } from './companies.types'

export const fetchCompanies = async () => {
	const res = await axiosInterceptor.get('/companies')
	return res.data
}

export const createCompany = async (formData: TCompanyFormData) => {
	const res = await axiosInterceptor.post('/companies', formData)
	return res.data
}

export const editCompany = async (formData: TCompany) => {
	const res = await axiosInterceptor.put(`/companies/${formData.id}`, {
		name: formData.name,
	})
	return res.data
}

export const deleteCompany = async (id: number) => {
	const res = await axiosInterceptor.delete(`/companies/${id}`)
	return res.data
}

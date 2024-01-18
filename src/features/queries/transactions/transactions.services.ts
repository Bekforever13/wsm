import { axiosInterceptor } from '@/shared/lib/api'
import { TTransactionsFormData } from './transactions.types'

export const fetchTransactions = async () => {
	const res = await axiosInterceptor.get('/transactions')
	return res.data
}

export const createTransactions = async (formData: TTransactionsFormData) => {
	const res = await axiosInterceptor.post('/transactions', formData)
	return res.data
}

export const editTransactions = async (formData: TTransactionsFormData) => {
	const res = await axiosInterceptor.put(`/transactions/${formData.id}`, {
		product_id: formData.product_id,
		payment_type: formData.payment_type,
		transaction_type: formData.transaction_type,
		price: formData.price,
		quantity: formData.quantity,
	})
	return res.data
}

export const deleteTransactions = async (id: number) => {
	const res = await axiosInterceptor.delete(`/transactions/${id}`)
	return res.data
}

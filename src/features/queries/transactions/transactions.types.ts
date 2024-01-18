import { TProducts } from '../products/products.types'

export type TTransactionsFormData = {
	product_id: number
	payment_type: number
	transaction_type: number
	price: number
	quantity: number
	date?: string
	id?: number
}

export type TTransactions = {
	id: number
	product: TProducts
	transaction_type: {
		id: number
		name: string
		created_at: string
		updated_at: string
	}
	payment_type: {
		id: number
		name: string
		created_at: string
		updated_at: string
	}
	client: string | null
	price: number
	quantity: number
	date: string
}

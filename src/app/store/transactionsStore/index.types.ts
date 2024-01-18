import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'

export type transactionsStoreType = {
	transactionsModal: boolean
	transactionsToEdit: TTransactionsFormData | null
	setTransactionsToEdit: (item: TTransactionsFormData | null) => void
	setTransactionsModal: (item: boolean) => void
}

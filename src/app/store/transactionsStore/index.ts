import { create } from 'zustand'
import { transactionsStoreType } from './index.types'

const TransactionsStore = create<transactionsStoreType>()(set => ({
	transactionsModal: false,
	transactionsToEdit: null,
	setTransactionsToEdit(item) {
		set(() => ({ transactionsToEdit: item }))
	},
	setTransactionsModal(item) {
		set(() => ({ transactionsModal: item }))
	},
}))

export { TransactionsStore }

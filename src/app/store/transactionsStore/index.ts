import { create } from 'zustand'
import { transactionsStoreType } from './index.types'

const TransactionsStore = create<transactionsStoreType>()((set) => ({
  transactionsModalSelling: false,
  transactionsModalIncome: false,
  transactionsToEdit: null,
  transactionsBranch: 0,
  transactionsPaymentType: 1,
  setTransactionsPaymentType(id) {
    set(() => ({ transactionsPaymentType: id }))
  },
  setTransactionsBranch(id) {
    set(() => ({ transactionsBranch: id }))
  },
  setTransactionsToEdit(item) {
    set(() => ({ transactionsToEdit: item }))
  },
  setTransactionsModalSelling(item) {
    set(() => ({ transactionsModalSelling: item }))
  },
  setTransactionsModalIncome(item) {
    set(() => ({ transactionsModalIncome: item }))
  },
}))

export { TransactionsStore }

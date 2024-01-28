import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'

export type transactionsStoreType = {
  transactionsModal: boolean
  transactionsToEdit: TTransactionsFormData | null
  transactionsBranch: number
  transactionsPaymentType: number
  setTransactionsPaymentType: (id: number) => void
  setTransactionsBranch: (id: number) => void
  setTransactionsToEdit: (item: TTransactionsFormData | null) => void
  setTransactionsModal: (item: boolean) => void
}

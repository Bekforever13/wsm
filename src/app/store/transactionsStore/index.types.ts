import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'

export type transactionsStoreType = {
  transactionsModalSelling: boolean
  transactionsModalIncome: boolean
  transactionsToEdit: TTransactionsFormData | null
  transactionsBranch: number
  transactionsPaymentType: number
  setTransactionsPaymentType: (id: number) => void
  setTransactionsBranch: (id: number) => void
  setTransactionsToEdit: (item: TTransactionsFormData | null) => void
  setTransactionsModalSelling: (item: boolean) => void
  setTransactionsModalIncome: (item: boolean) => void
}

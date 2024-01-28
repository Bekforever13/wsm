import { TProducts } from '../products/products.types'

export type TTransactionsFormData = {
  product_id: number
  payment_type: number
  transaction_type: number
  price: number
  quantity: number
  date?: string
  id?: number
  user_id?: number
}

export type TTransactionsIncome = {
  company: { id: number; name: string }
  date: string
  from_whom: string
  id: number
  payment_type: { id: number; name: string }
  price: number
  product: TProducts
  quantity: number
  total: number
}

export type TTransactionsSelling = {
  company: { id: number; name: string }
  id: number
  payment_type: { id: number; name: string }
  price: number
  product: TProducts
  quantity: number
  total: number
}

export type TTransactionsError = {
  response: {
    data: {
      data: string
    }
  }
}

import { TProducts } from '..'
import { TCompany } from '../company/companies.types'

export type TRefund = {
  id: number
  company: TCompany
  product: TProducts
  date: string
}

export interface IRefundsData {
  data: TRefund[]
}

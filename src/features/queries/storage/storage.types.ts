import { TCompany } from '../company/companies.types'

export type TStorage = {
  id: number
  product: {
    id: number
    category_id: number
    brand_id: number
    name: string
    created_at: string
    updated_at: string
    selling_price: number
  }
  purchased: number
  sales: number
  quantity: number
  company: TCompany
  date: string
}

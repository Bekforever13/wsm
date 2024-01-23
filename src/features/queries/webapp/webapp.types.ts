import { TProducts } from '..'
import { TCompany } from '../company/companies.types'

export type TTelegramProductsData = {
  data: TProducts[]
}

export type TTelegramCompaniesData = {
  data: TCompany[]
}

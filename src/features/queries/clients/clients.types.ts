export type TClient = {
  id: number
  name: string
  description: string
  phone: string
  debt_total_sum: null | number
}

export type TClientFormData = {
  name: string
  description: string
  phone: string
  debt_total_sum: null | number
}

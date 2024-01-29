export type TProducts = {
  id: number
  category_id: number
  brand_id: number
  name: string
  selling_price: number
}

export type TProductsFormData = {
  category_id: number
  brand_id: number
  selling_price: number
  name: string
}

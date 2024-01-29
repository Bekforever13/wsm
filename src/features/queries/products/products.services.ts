import { axiosInterceptor } from '@/shared/lib/api'
import { TProducts, TProductsFormData } from './products.types'

export const fetchProducts = async () => {
  const res = await axiosInterceptor.get('/products')
  return res.data
}

export const createProducts = async (formData: TProductsFormData) => {
  const res = await axiosInterceptor.post('/products', formData)
  return res.data
}

export const editProducts = async (formData: TProducts) => {
  const res = await axiosInterceptor.put(`/products/${formData.id}`, {
    name: formData.name,
    category_id: formData.category_id,
    brand_id: formData.brand_id,
    selling_price: formData.selling_price,
  })
  return res.data
}

export const deleteProducts = async (id: number) => {
  const res = await axiosInterceptor.delete(`/products/${id}`)
  return res.data
}

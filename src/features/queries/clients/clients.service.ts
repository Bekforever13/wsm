import { axiosInterceptor } from '@/shared/lib/api'
import { TClient, TClientFormData } from './clients.types'

export const fetchClients = async () => {
  const res = await axiosInterceptor.get('/clients')
  return res.data
}

export const createClient = async (formData: TClientFormData) => {
  const res = await axiosInterceptor.post('/clients', formData)
  return res.data
}

export const editClient = async (formData: TClient) => {
  const res = await axiosInterceptor.put(`/clients/${formData.id}`, {
    name: formData.name,
  })
  return res.data
}

export const deleteClient = async (id: number) => {
  const res = await axiosInterceptor.delete(`/clients/${id}`)
  return res.data
}

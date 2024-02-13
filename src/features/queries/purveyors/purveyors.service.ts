import { axiosInterceptor } from '@/shared/lib/api'
import { TPurveyors, TPurveyorsFormData } from './purveyors.types'

export const fetchPurveyors = async () => {
  const res = await axiosInterceptor.get('/purveyors')
  return res.data
}

export const createPurveyor = async (formData: TPurveyorsFormData) => {
  const res = await axiosInterceptor.post('/purveyors', formData)
  return res.data
}

export const editPurveyor = async (formData: TPurveyors) => {
  const res = await axiosInterceptor.put(`/purveyors/${formData.id}`, formData)
  return res.data
}

export const deletePurveyor = async (id: number) => {
  const res = await axiosInterceptor.delete(`/purveyors/${id}`)
  return res.data
}

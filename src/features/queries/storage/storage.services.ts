import { axiosInterceptor } from '@/shared/lib/api'
import { AxiosResponse } from 'axios'
import { TStorage } from '..'

export const fetchStorage = async () => {
  const res: AxiosResponse<{ data: TStorage[] }> = await axiosInterceptor.get('/stockrooms')
  return res.data
}

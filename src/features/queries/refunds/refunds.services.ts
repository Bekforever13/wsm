import { axiosInterceptor } from '@/shared/lib/api'
import { IRefundsData } from './refunds.types'

export const fetchRefunds = async (): Promise<IRefundsData> => {
  const res = await axiosInterceptor.get('/refunds')
  return res.data
}

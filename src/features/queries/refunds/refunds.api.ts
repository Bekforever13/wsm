import { useQuery } from '@tanstack/react-query'
import { fetchRefunds } from './refunds.services'

const useGetRefunds = () =>
  useQuery({
    queryFn: () => fetchRefunds(),
    queryKey: ['refunds'],
  })

export { useGetRefunds }

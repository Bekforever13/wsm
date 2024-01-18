import { useQuery } from '@tanstack/react-query'
import { fetchStorage } from './storage.services'

const useGetStorage = () =>
	useQuery({
		queryFn: () => fetchStorage(),
		queryKey: ['storage'],
	})

export { useGetStorage }

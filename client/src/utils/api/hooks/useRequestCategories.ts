import { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { requestCategories } from '../requests/category'

export const useRequestCategories = () =>
	useQuery<AxiosResponse<Category[]>>({
		queryKey: ['categories'],
		queryFn: requestCategories,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	})

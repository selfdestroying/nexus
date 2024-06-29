import { useInfiniteQuery } from '@tanstack/react-query'
import { requestProductByCategoryName } from '../requests/product/category_name'

interface RequerstInfinityQuery {
	queryParamsString: string
}

export const useProductInfiniteQuery = ({
	queryParamsString,
}: RequerstInfinityQuery) =>
	useInfiniteQuery({
		queryKey: ['products', queryParamsString],
		queryFn: ({ pageParam }) => requestProductByCategoryName(pageParam),
		initialPageParam: queryParamsString,
		getNextPageParam: lastPage => {
			return lastPage.data.next
		},
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	})

import { Paginated, Product } from '@/types'
import { api } from '@/utils/api/instance'

export const requestProductByCategoryName = (queryString: string) =>
	api.get<Paginated<Product>>(queryString)

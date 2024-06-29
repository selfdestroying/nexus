import { Filter } from '@/types'
import { useState } from 'react'

interface FilterReturn {
	filters: Filter[]
	updateFilter: (slug: string, value: any) => void
	applyFilters: () => string
}

export function useFilter(initialFilters: Filter[]): FilterReturn {
	const [filters, setFilters] = useState<Filter[]>(initialFilters)

	const updateFilter = (slug: string, value: any) => {
		setFilters(
			filters.map(filter =>
				filter.slug === slug ? { ...filter, value } : filter
			)
		)
	}

	const applyFilters = () => {
		const queryParams = filters
			.map(filter => {
				if (filter.type === 'range') {
					if (filter.value.from === 0 && filter.value.to !== 0) {
						return `${filter.slug}=${filter.min}-${filter.value.to}`
					} else if (filter.value.to === 0 && filter.value.from !== 0) {
						return `${filter.slug}=${filter.value.from}-${filter.max}`
					} else if (filter.value.from === 0 && filter.value.to === 0) {
						return ''
					}
					return `${filter.slug}=${filter.value.from}-${filter.value.to}`
				} else if (filter.type === 'select') {
					if (filter.value.length === 0) {
						return ''
					}
					return `${filter.slug}=${filter.value.join('-')}`
				}
				return ''
			})
			.filter(Boolean)
			.join('&')

		return queryParams
	}

	return {
		filters,
		updateFilter,
		applyFilters,
	}
}

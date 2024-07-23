import { Filter } from '@/types'
import { useFilter } from '@/utils/hooks/useFilter'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface FiltersProps {
	initialFilters: Filter[]
	setqueryParamsString: (value: string) => void
}

const Filters: FC<FiltersProps> = ({
	initialFilters,
	setqueryParamsString,
}) => {
	const params = useParams()
	const { filters, updateFilter, applyFilters } = useFilter(initialFilters)

	const handleApplyFilters = () => {
		const newQueryParams = applyFilters()
		setqueryParamsString(
			`products/?limit=12&${
				params.category ? `category_slug=${params.category}&` : ''
			}` + newQueryParams
		)
	}
	return (
		<div className='h-fit flex flex-col items-start space-y-4 rounded-lg border p-4'>
			{filters.map(filter => (
				<div key={filter.name}>
					{filter.type === 'range' ? (
						<>
							<Label>{filter.name}</Label>
							<div className='flex space-x-2'>
								<Input
									type='number'
									name={filter.name}
									min={filter.min}
									max={filter.max}
									placeholder={`${filter.min}`}
									value={filter.value.from}
									onChange={e => {
										if (Number(e.target.value) <= filter.value.to) {
											updateFilter(filter.slug, {
												from: Math.max(Number(e.target.value), filter.min),
												to: filter.value.to,
											})
										} else {
											updateFilter(filter.slug, {
												from: Number(e.target.value),
												to: Number(e.target.value),
											})
										}
									}}
								/>
								<Input
									type='number'
									name={filter.name}
									min={filter.min}
									max={filter.max}
									placeholder={`${filter.max}`}
									value={filter.value.to}
									onChange={e => {
										if (Number(e.target.value) >= filter.value.from) {
											updateFilter(filter.slug, {
												from: filter.value.from,
												to: Math.min(Number(e.target.value), filter.max),
											})
										} else {
											updateFilter(filter.slug, {
												from: Number(e.target.value),
												to: Number(e.target.value),
											})
										}
									}}
								/>
							</div>
						</>
					) : (
						filter.type === 'select' && (
							<div className='flex flex-col gap-2'>
								<Label>{filter.name}</Label>
								{filter.options.map(option => (
									<div className='flex flex-row gap-2' key={option}>
										<Checkbox
											key={option}
											name={filter.slug}
											value={option}
											onCheckedChange={e => {
												if (e) {
													updateFilter(filter.slug, [...filter.value, option])
												} else {
													updateFilter(
														filter.slug,
														filter.value.filter(val => val !== option)
													)
												}
											}}
										>
											{option}
										</Checkbox>
										<Label>{option}</Label>
									</div>
								))}
							</div>
						)
					)}
				</div>
			))}
			<Button onClick={handleApplyFilters}>Apply</Button>
		</div>
	)
}

export default Filters

import Filters from '@/components/filters'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Filter } from '@/types'
import { useProductInfiniteQuery } from '@/utils/api/hooks/useRequestProductInfinityQuery'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

const initialFilters: Filter[] = [
	{
		name: 'Price',
		slug: 'price',
		type: 'range',
		min: 0,
		max: 100,
		value: {
			from: 0,
			to: 0,
		},
	},

	{
		name: 'Width',
		slug: 'width',
		type: 'range',
		min: 0,
		max: 100,
		value: {
			from: 0,
			to: 0,
		},
	},
	{
		name: 'Height',
		slug: 'height',
		type: 'range',
		min: 0,
		max: 100,
		value: {
			from: 0,
			to: 0,
		},
	},
	{
		name: 'Material',
		slug: 'material',
		type: 'select',
		options: [
			'wood',
			'rubber',
			'plastic',
			'glass',
			'paper',
			'stone',
			'fabric',
			'ceramic',
			'leather',
			'metal',
		],
		value: [],
	},
]

const Products = () => {
	const params = useParams()

	const [queryParamsString, setqueryParamsString] = useState(
		`products/?limit=12&${
			params.category ? 'category_slug=' + params.category : ''
		}`
	)
	const { data, status, fetchNextPage, hasNextPage } = useProductInfiniteQuery({
		queryParamsString,
	})

	useEffect(() => {
		setqueryParamsString(
			`products/?limit=12&${
				params.category ? 'category_slug=' + params.category : ''
			}`
		)
	}, [params.category])

	return (
		<>
			<section className='container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row gap-8'>
				<Filters
					initialFilters={initialFilters}
					setqueryParamsString={setqueryParamsString}
				/>

				<div className='p-4 w-full flex flex-col items-center gap-4'>
					<h2 className='text-3xl font-bold'>
						{params.category ? params.category.toUpperCase() : 'ALL'}
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3'>
						{status === 'success' &&
							data.pages.map((page, i) => (
								<Fragment key={i}>
									{page.data.results.map(product => (
										<ProductCard key={product.id} product={product} />
									))}
								</Fragment>
							))}
					</div>
					<Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
						{hasNextPage ? 'Load More' : 'Nothing more to load'}
					</Button>
				</div>
			</section>
		</>
	)
}

export default Products

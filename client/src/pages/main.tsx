import CategoryCard from '@/components/category-card'
import { useRequestCategories } from '@/utils/api/hooks/useRequestCategories'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const Main = () => {
	const { data, isLoading, isError, error } = useRequestCategories()

	if (isError) return <div>{error.message}</div>

	if (isLoading) return <div>Loading</div>

	return (
		<>
			<section className='container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row gap-8'>
				<div className='w-full space-y-4 flex items-center flex-col md:items-start'>
					<h1 className='text-3xl font-bold'>Nexus Store</h1>
					<p className='text-gray-400'>
						3D figures and accessories for your next adventure.
					</p>
					<img
						src='/nexus_logo.png'
						width={600}
						height={200}
						alt='Nexus'
						className='rounded-md'
					/>
				</div>

				<div className='w-full flex flex-col items-center justify-center gap-4'>
					<Badge variant={'secondary'}>New Arrivals</Badge>
					<h1 className='text-3xl font-bold'>Discover the latest products</h1>
					<p className='text-gray-400'>
						Explore our wide range of products and find what you need.
					</p>

					<Link to='/products'>
						<Button variant='default'>Shop Now</Button>
					</Link>
				</div>
			</section>
			<section className='container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row gap-8'>
				<div className='w-full space-y-4 flex items-center flex-col md:items-start'>
					<h2 className='text-2xl font-bold'>Categories</h2>
					<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{data?.data.map(category => (
							<CategoryCard key={category.id} category={category} />
						))}
					</div>
				</div>
			</section>
			{/* <section className='container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row gap-8'>
				<div className='w-full space-y-4 flex items-center flex-col md:items-start'>
					<h2 className='text-2xl font-bold'>Featured Products</h2>
					<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</div>
			</section> */}
		</>
	)
}

export default Main

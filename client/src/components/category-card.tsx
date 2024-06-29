import { Category } from '@/types'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Button
			variant={'secondary'}
			className='w-full h-fit transition-colors rounded-md p-0'
		>
			<Link
				to={`/products/${category.slug}`}
				className='w-full h-full flex flex-col items-center gap-2 p-4'
			>
				<img src={category.icon} className='w-8 h-8' />
				<span className='text-sm font-medium'>{category.name}</span>
			</Link>
		</Button>
	)
}

export default CategoryCard

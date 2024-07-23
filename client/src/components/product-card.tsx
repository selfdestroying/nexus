import { Product } from '@/types'
import { useUser } from '@/utils/api/hooks/useUser'
import useProductInCart from '@/utils/hooks/useProductInCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCartIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Label } from './ui/label'

const addToCart = async (id: number) => {
	const accessToken = localStorage.getItem('access_token')
	const headers = new Headers()
	headers.append('Authorization', `Bearer ${accessToken}`)
	headers.append('Content-Type', 'application/json')
	const response = await fetch(`http://127.0.0.1:8000/api/cart/create/`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ product: id, quantity: 1 }),
	})

	const data = await response.json()
	return data
}

const ProductCard = ({ product }: { product: Product }) => {
	const queryClient = useQueryClient()

	const { user } = useUser()
	const isInCart = useProductInCart(user?.cart, product.id)

	const mutation = useMutation({
		mutationFn: addToCart,
		onSuccess: _ => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})
	return (
		<Card className='bg-transparent'>
			<CardHeader className='p-4 relative overflow-hidden'>
				<div className='border-hidden overflow-hidden rounded-md'>
					<img
						src={product.image}
						alt='product1'
						width={150}
						height={150}
						className={`w-full aspect-square object-cover object-top ${
							product.adult && !user ? 'blur-xl' : ''
						}`}
					/>
				</div>
				<span
					className={`absolute ${
						!user ? 'top-1/2 left-1/2' : 'top-6 left-12'
					} -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-red-400`}
				>
					{product.adult ? '18+' : null}
				</span>
			</CardHeader>
			<CardContent className='space-y-4 p-4 pt-0'>
				<CardTitle className='flex justify-between'>
					<span>{product.name}</span>
				</CardTitle>
				<CardDescription className='flex flex-col gap-1 p-2 rounded-lg border'>
					<span>Material: {product.material}</span>
					<span>Width: {product.width}</span>
					<span>Height: {product.height}</span>
					<span>Category: {product.category.name}</span>
				</CardDescription>
			</CardContent>
			<CardFooter className='flex justify-between p-4 pt-0'>
				<Label className='text-2xl'>${product.price}</Label>
				<div className='flex gap-2'>
					{/* <Button size={'icon'}>
						<HeartIcon className='h-4 w-4' />
					</Button> */}

					<Button
						size={'icon'}
						onClick={() => mutation.mutate(product.id)}
						disabled={isInCart}
					>
						<ShoppingCartIcon className='h-4 w-4' />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default ProductCard

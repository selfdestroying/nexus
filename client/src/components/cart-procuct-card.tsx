import { Cart } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'

const updateQuantity = async ({
	id,
	quantity,
	direction,
}: {
	id: number
	quantity: number
	direction: number
}) => {
	const accessToken = localStorage.getItem('access_token')

	const headers = new Headers()
	headers.append('Authorization', `Bearer ${accessToken}`)
	headers.append('Content-Type', 'application/json')
	const response = await fetch(`http://127.0.0.1:8000/api/cart/${id}/update/`, {
		method: 'PATCH',
		headers,
		body: JSON.stringify({ quantity, direction }),
	})
	const data = await response.json()
	return data
}

const deleteProduct = async ({
	id,
	quantity,
	productId,
}: {
	id: number
	quantity: number
	productId: number
}) => {
	const accessToken = localStorage.getItem('access_token')

	const headers = new Headers()
	headers.append('Authorization', `Bearer ${accessToken}`)
	headers.append('Content-Type', 'application/json')
	const response = await fetch(`http://127.0.0.1:8000/api/cart/${id}/delete/`, {
		method: 'DELETE',
		headers,
		body: JSON.stringify({ id: productId, quantity }),
	})
	console.log()
	console.log(response)
}

const CartProductCart = ({ cart }: { cart: Cart }) => {
	const [quantity, setQuantity] = useState(cart.quantity)

	const [price, setPrice] = useState(cart.product.price)
	const queryClient = useQueryClient()

	const updateMutation = useMutation({
		mutationFn: updateQuantity,
		onSuccess: data => {
			setQuantity(data.quantity)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})

	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: _ => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})

	const incrementQuantity = () => {
		updateMutation.mutate({
			id: cart.id,
			quantity: cart.quantity + 1,
			direction: 1,
		})
	}

	const decrementQuantity = () => {
		updateMutation.mutate({
			id: cart.id,
			quantity: cart.quantity - 1,
			direction: -1,
		})
	}

	useEffect(() => {
		setPrice(quantity * cart.product.price)
	}, [cart])

	return (
		<Card className='flex flex-row justify-between items-center h-24'>
			<CardHeader className='p-2 w-24 h-24'>
				<img
					src={cart.product.image}
					alt=''
					width={50}
					height={50}
					className='rounded-md aspect-square object-top object-cover w-full h-full'
				/>
			</CardHeader>
			<CardContent className='h-full p-3 flex flex-auto flex-col justify-between items-start text-left'>
				<p>{cart.product.name}</p>
				<div className='flex gap-2'>
					<Button
						variant={'outline'}
						size={'icon'}
						className='size-fit p-1'
						onClick={decrementQuantity}
						disabled={cart.quantity === 1}
					>
						<MinusIcon className='h-4 w-4' />
					</Button>
					<span className='h-full'>{cart.quantity}</span>
					<Button
						variant={'outline'}
						size={'icon'}
						className='size-fit p-1'
						onClick={incrementQuantity}
						disabled={cart.quantity >= cart.product.quantity + cart.quantity}
					>
						<PlusIcon className='h-4 w-4' />
					</Button>
				</div>
			</CardContent>

			<CardFooter className='h-full p-3 flex flex-col justify-between'>
				<Button
					variant={'outline'}
					className='size-fit p-1'
					onClick={() =>
						deleteMutation.mutate({
							id: cart.id,
							productId: cart.product.id,
							quantity,
						})
					}
				>
					<Trash2Icon className='h-4 w-4' />
				</Button>
				<p>${price}</p>
			</CardFooter>
		</Card>
	)
}

export default CartProductCart

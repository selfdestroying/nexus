import { User } from '@/types'
import { ShoppingCartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import CartProductCart from './cart-procuct-card'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet'

const Cart = ({ user }: { user: User }) => {
	const [totalPrice, setTotalPrice] = useState(
		user?.cart.reduce(
			(acc, item) => acc + item.product.price * item.quantity,
			0
		)
	)

	useEffect(() => {
		setTotalPrice(
			user?.cart.reduce(
				(acc, item) => acc + item.product.price * item.quantity,
				0
			)
		)
	}, [user])

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'outline'} size={'icon'} className='relative'>
					{user && user.cart.length > 0 && (
						<div className='absolute left-7 bottom-7 flex items-center justify-center rounded-full bg-red-500 size-4 text-xs font-medium text-white'>
							{user.cart.length}
						</div>
					)}
					<ShoppingCartIcon />
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col justify-between w-full'>
				<SheetTitle className='text-3xl'>Cart</SheetTitle>
				<SheetDescription></SheetDescription>
				<ScrollArea className='h-[750px]'>
					<SheetHeader>
						{user &&
							user.cart.map(item => (
								<CartProductCart key={item.id} cart={item} />
							))}
					</SheetHeader>
				</ScrollArea>
				<SheetFooter>
					<div className='flex flex-row justify-between items-center w-full'>
						{totalPrice && <p className='text-xl'>Total: ${totalPrice}</p>}
						<Button>Order Now</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default Cart

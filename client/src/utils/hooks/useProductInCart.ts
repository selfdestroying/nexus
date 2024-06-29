import { Cart } from '@/types'
import { useEffect, useState } from 'react'

function useProductInCart(cart: Cart[] | undefined, targetProductId: number) {
	const [isInCart, setIsInCart] = useState(false)

	useEffect(() => {
		if (!cart) return
		const productExists = cart.some(item => item.product.id === targetProductId)
		setIsInCart(productExists)
	}, [cart, targetProductId])

	return isInCart
}

export default useProductInCart

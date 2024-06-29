export interface Category {
	id: number
	name: string
	slug: string
	icon: string
}

export interface Product {
	id: number
	name: string
	slug: string
	price: number
	quantity: number
	image: string
	description: string
	width: number
	height: number
	material: string
	color: string
	adult: boolean
	category: Category
}

export interface Paginated<T> {
	count: number
	next: string
	previous: string
	results: T[]
}

export interface Cart {
	id: number
	product: Product
	quantity: number
}

export interface User {
	id: number
	username: string
	email: string
	cart: Cart[]
}

interface RangeFilterOptions {
	type: 'range'
	name: string
	slug: string
	min: number
	max: number
	value: {
		from: number
		to: number
	}
}

interface SelectFilterOptions {
	type: 'select'
	slug: string
	name: string
	options: string[]
	value: string[]
}

export type Filter = RangeFilterOptions | SelectFilterOptions

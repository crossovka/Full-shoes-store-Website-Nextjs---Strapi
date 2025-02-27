import { Product } from '../../types/product.types'

export interface CartState {
	items: CartItem[]
	totalPrice: number
}

export interface CartItem extends Product {
	quantity: number
	productIdWithSize: string
}

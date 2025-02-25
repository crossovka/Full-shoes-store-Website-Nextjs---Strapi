import { cartSlice } from './cart/cart.slice'
import { productActions } from './product/product.slice'

export const rootActions = {
	...cartSlice.actions,
	...productActions 
}

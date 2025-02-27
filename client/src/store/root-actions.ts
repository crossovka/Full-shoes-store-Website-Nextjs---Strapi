import { productActions } from './product/product.slice'
import { cartActions } from './cart/cart.slice'

export const rootActions = {
	...productActions,
	cartActions
}

import { productActions } from './product/product.slice'
import { categoryActions } from './category/category.slice'
import { cartActions } from './cart/cart.slice'

export const rootActions = {
	...productActions,
	...categoryActions,
	cartActions
}

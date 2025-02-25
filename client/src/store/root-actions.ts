import { productActions } from './product/product.slice'
import { categoryActions } from './category/category.slice'

export const rootActions = {
	...productActions,
	...categoryActions
}

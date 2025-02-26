import { RootState } from '@/store/store'

// Получение всех товаров в корзине
export const selectCartItems = (state: RootState) => state.cart.items

// Получение общей стоимости корзины
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice

// Получение количества товаров в корзине
export const selectCartTotalQuantity = (state: RootState) =>
	state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

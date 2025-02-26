import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState } from './cart.types'

const initialState: CartState = {
	items: [],
	totalPrice: 0
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			// Создаем уникальный id для товара с учетом размера
			const productIdWithSize = `${action.payload.id}-${action.payload.size}`
			const existingItem = state.items.find((item) => item.productIdWithSize === productIdWithSize)

			if (existingItem) {
				existingItem.quantity += action.payload.quantity
			} else {
				state.items.push({ ...action.payload, productIdWithSize, quantity: 1 })
			}

			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.productIdWithSize !== action.payload)
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find((item) => item.productIdWithSize === action.payload)
			if (item) {
				item.quantity += 1
				state.totalPrice += item.price
			}
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find((item) => item.productIdWithSize === action.payload)
			if (item && item.quantity > 1) {
				item.quantity -= 1
				state.totalPrice -= item.price
			}
		},
		clearCart: (state) => {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
	cartSlice.actions
export default cartSlice.reducer

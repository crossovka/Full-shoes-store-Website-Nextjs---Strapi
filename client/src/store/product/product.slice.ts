import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductState } from './product.types'
import { fetchProductBySlug, fetchProducts } from './product.asyncActions'

const initialState: ProductState = {
	products: [],
	isLoading: false,
	product: null,
	error: null
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
				state.isLoading = false
				state.products = action.payload
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message || 'Failed to load products'
			})
			// Обработка запроса одного продукта
			.addCase(fetchProductBySlug.pending, (state) => {
				state.isLoading = true
				state.product = null
				state.error = null
			})
			.addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
				state.isLoading = false
				state.product = action.payload
			})
			.addCase(fetchProductBySlug.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message || 'Failed to load product'
			})
	}
})

export const productActions = {
	...productSlice.actions, // Все обычные actions
	fetchProducts,
	fetchProductBySlug
}

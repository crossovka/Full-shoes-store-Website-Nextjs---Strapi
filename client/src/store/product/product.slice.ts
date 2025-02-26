import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductResponse, ProductState } from './product.types'
import {
	fetchProductsByCategorySlug,
	fetchProductBySlug,
	fetchProducts
} from './product.asyncActions'

const initialState: ProductState = {
	products: [],
	isLoading: false,
	product: null,
	error: null,
	pagination: {
		page: 1,
		pageSize: 12,
		pageCount: 1,
		total: 0
	}
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
			// Логика для получения по slug
			.addCase(fetchProductsByCategorySlug.pending, (state) => {
				state.isLoading = true
				state.products = [] // Очистка продуктов перед загрузкой
				state.error = null // Сброс ошибки
			})
			.addCase(fetchProductsByCategorySlug.fulfilled, (state, action: PayloadAction<ProductResponse>) => {
				console.log('Пагинация из ответа:', action.payload.meta.pagination);
				state.isLoading = false;
				state.products = action.payload.data;
				state.pagination = {
					page: action.payload.meta.pagination.page,
					pageSize: action.payload.meta.pagination.pageSize,
					pageCount: action.payload.meta.pagination.pageCount,
					total: action.payload.meta.pagination.total
				};
			})
			
			.addCase(fetchProductsByCategorySlug.rejected, (state, action) => {
				state.isLoading = false // Остановка индикатора загрузки
				state.error = action.error.message || 'Failed to load product' // Сохранение ошибки
			})
	}
})

export const productActions = {
	...productSlice.actions, // Все обычные actions
	fetchProducts,
	fetchProductBySlug,
	fetchProductsByCategorySlug
}

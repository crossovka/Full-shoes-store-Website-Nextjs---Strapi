import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, CategoryState } from './category.types'
import { fetchCategories } from './category.asyncActions'

const initialState: CategoryState = {
	categories: [],
	isLoading: false,
	error: null
}

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
				state.isLoading = false
				state.categories = action.payload
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	}
})

export const categoryActions = {
	...categorySlice.actions,
	fetchCategories
}

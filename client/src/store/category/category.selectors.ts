import { RootState } from '@/store/store'

export const selectCategories = (state: RootState) => state.category.categories
export const selectIsLoadingCategories = (state: RootState) => state.category.isLoading
export const selectCategoryError = (state: RootState) => state.category.error

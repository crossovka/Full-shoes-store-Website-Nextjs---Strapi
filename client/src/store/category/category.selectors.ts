import { RootState } from '@/store/store'

// Селектор для списка категорий
export const selectCategories = (state: RootState) => state.category.categories

// Селектор для загрузки
export const selectIsLoadingCategories = (state: RootState) => state.category.isLoading

// Селектор для ошибок
export const selectCategoryError = (state: RootState) => state.category.error

// Селектор для получения категории по slug
export const selectSelectedCategory = (state: RootState) => state.category.selectedCategory
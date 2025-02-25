import { RootState } from '@/store/store'

// Селектор для получения всех продуктов
export const selectProducts = (state: RootState) => state.product.products

// Селектор для статуса загрузки
export const selectIsLoading = (state: RootState) => state.product.isLoading

// Селектор для ошибки
export const selectError = (state: RootState) => state.product.error

import { RootState } from '@/store/store'

// Селектор для получения всех продуктов
export const selectProducts = (state: RootState) => state.product.products

// Селектор для статуса загрузки
export const selectProductIsLoading = (state: RootState) => state.product.isLoading

// Селектор для ошибки
export const selectProductError = (state: RootState) => state.product.error

// Селектор для выбранного товара
export const selectProduct = (state: RootState) => state.product.product

// Селектор для получения информации о пагинации
export const selectProductPagination = (state: RootState) => state.product?.pagination;
import { Product } from '../product/product.types'

export interface Category {
	id: number
	documentId: string
	name: string
	slug: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	products: Product[] // или укажи точный тип продукта, если есть
}

export interface PaginationMeta {
	page: number
	pageSize: number
	pageCount: number
	total: number
}

export interface CategoryResponse {
	data: Category[]
	meta: {
		pagination: PaginationMeta
	}
}

export interface CategoryState {
	categories: Category[]
	isLoading: boolean
	error: string | null
}

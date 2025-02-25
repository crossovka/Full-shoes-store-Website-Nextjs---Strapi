import { ImageProps } from '@/types'

export interface ProductState {
	products: Product[]
	isLoading: boolean
	error: string | null
}

export interface ProductSize {
	size: string
	enabled: boolean
}

export interface Product {
	id: number
	documentId: string
	name: string
	subtitle: string
	price: number
	description: string
	size: { data: ProductSize[] }
	original_price: number | null
	slug: string
	image: ImageProps[]
	thumbnail: ImageProps
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export interface ProductResponse {
	data: Product[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

import axios, { AxiosRequestConfig } from 'axios'
import { API_ROUTES } from './apiRoutes'
import { getStrapiURL } from './get-strapi-url'

import { Category, CategoryResponse } from '@/types/category.types'
import { Product, ProductResponse } from '@/types/product.types'

export async function fetchFromStrapi<T>(
	path: string,
	options: AxiosRequestConfig = {}
): Promise<{ data: T; meta?: any }> {
	// Возвращаем data и meta
	try {
		const url = getStrapiURL(path)
		const response = await axios.get<{ data: T; meta?: any }>(url, options)
		console.log('Fetched data:', response.data)
		return response.data // Возвращаем оба поля
	} catch (error) {
		console.error('API fetch error:', error)
		throw error
	}
}

export async function getCategories(): Promise<Category[]> {
	const response = await fetchFromStrapi<CategoryResponse>(API_ROUTES.CATEGORIES)
	return response.data
}

export async function fetchProductsByCategorySlug(
	slug: string,
	page: number
): Promise<{
	products: ProductResponse['data']
	pagination: ProductResponse['meta']['pagination']
}> {
	const url = `${API_ROUTES.PRODUCTS}&filters[categories][slug][$eq]=${encodeURIComponent(
		slug
	)}&pagination[page]=${page}&pagination[pageSize]=3`

	const response = await fetchFromStrapi<ProductResponse>(url)
	return {
		products: response.data,
		pagination: response.meta?.pagination || { page: 1, pageSize: 3, pageCount: 1, total: 0 }
	}
}

import axios, { AxiosRequestConfig } from 'axios'
import { API_ROUTES } from './apiRoutes';
import { getStrapiURL } from './get-strapi-url'

import { CategoryResponse } from '@/types/category.types';

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
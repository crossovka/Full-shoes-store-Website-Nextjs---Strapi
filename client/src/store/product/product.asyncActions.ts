import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product, ProductResponse } from './product.types'
import { getStrapiURL } from '@/utils/get-strapi-url'

export const fetchProductBySlug = createAsyncThunk<Product, string, { rejectValue: string }>(
	'product/fetchProductBySlug',
	async (slug, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<ProductResponse>(
				getStrapiURL(`products?filters[slug][$eq]=${encodeURIComponent(
					slug
				)}&populate=*`)
			)
			if (data.data.length === 0) throw new Error('Product not found')
			console.log('fetchProductBySlug response:', data) // Вывод в консоль
			return data.data[0] // Берем первый найденный товар
		} catch (error) {
			console.error('Error fetching product:', error)
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product')
		}
	}
)

export const fetchProductsByCategorySlug = createAsyncThunk<
	ProductResponse, // Возвращаем весь объект, включая мета-данные
	{ slug: string; page: number }, // Передаем как slug, так и page
	{ rejectValue: string }
>('category/fetchProductsByCategorySlug', async ({ slug, page }, { rejectWithValue }) => {
	try {
		const url = getStrapiURL(
			`products?populate=*&[filters][categories][slug][$eq]=${encodeURIComponent(
				slug
			)}&pagination[page]=${page}&pagination[pageSize]=3`
		)
		console.log('fetchProductsByCategorySlug URL:', url)

		const { data } = await axios.get<ProductResponse>(url)

		console.log('fetchProductsByCategorySlug response:', data) // Вывод в консоль

		return data // Возвращаем весь объект с данными и мета-данными
	} catch (error) {
		console.error('Ошибка при загрузке категории:', error)
		return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch category')
	}
})

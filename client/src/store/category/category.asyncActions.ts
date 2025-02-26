import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryResponse } from './category.types'
import { getStrapiURL } from '@/utils/get-strapi-url'

// Получение списка категорий
export const fetchCategories = createAsyncThunk(
	'category/fetchCategories',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<CategoryResponse>(getStrapiURL('categories?populate=*'))
			return data.data
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories')
		}
	}
)
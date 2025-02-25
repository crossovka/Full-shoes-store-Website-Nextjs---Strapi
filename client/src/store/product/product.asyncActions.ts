import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductResponse } from './product.types'
import { getStrapiURL } from '@/utils/get-strapi-url'

export const fetchProducts = createAsyncThunk(
	'product/fetchProducts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<ProductResponse>(getStrapiURL('products?populate=*'))
			console.log('Fetched products:', data.data)
			return data.data
		} catch (error) {
			console.error('Error fetching products:', error)
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products')
		}
	}
)

export const fetchProductBySlug = createAsyncThunk(
  'product/fetchProductBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ProductResponse>(getStrapiURL(`products?filters[slug][$eq]=${slug}&populate=*`))
      if (data.data.length === 0) throw new Error('Product not found')
      return data.data[0] // Берем первый найденный товар
    } catch (error) {
      console.error('Error fetching product:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product')
    }
  }
)
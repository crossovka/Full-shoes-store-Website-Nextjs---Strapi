import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
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


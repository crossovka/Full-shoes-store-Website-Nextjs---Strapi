import { Product } from '@/types/product.types'
import { fetchFromStrapi } from '@/utils/api'
import { API_ROUTES } from '@/utils/apiRoutes'

import HomePage from '@/components/home/HomePage'

export default async function Home() {
	try {
		const { data: products } = await fetchFromStrapi<Product[]>(API_ROUTES.PRODUCTS)
		return <HomePage products={products} /> // Передаем только массив товаров
	} catch (error) {
		console.error('Error fetching products:', error)
		return <HomePage products={[]} />
	}
}

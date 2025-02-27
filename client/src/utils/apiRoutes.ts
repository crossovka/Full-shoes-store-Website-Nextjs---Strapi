export const API_ROUTES = {
	PRODUCTS: 'products?populate=*',
	PRODUCT_BY_SLUG: (slug: string) => `products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
	CATEGORIES: 'categories?populate=*',
}

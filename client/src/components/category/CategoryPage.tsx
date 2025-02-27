'use client'
import React, { useEffect, useState } from 'react'

import ProductCard from '@/components/ui/ProductCard'
import Wrapper from '@/components/layout/Wrapper'
import Loader from '@/components/ui/Loader/Loader'
import Pagination from '@/components/ui/Pagination'

import { fetchProductsByCategorySlug } from '@/utils/api'
import { Product } from '@/types/product.types'

interface CategoryPageProps {
	slug: string
	initialProducts: Product[]
	initialPagination: {
		page: number
		pageSize: number
		pageCount: number
		total: number
	}
}
const CategoryPage: React.FC<CategoryPageProps> = ({
	slug,
	initialProducts,
	initialPagination
}) => {
	const [products, setProducts] = useState<Product[]>(initialProducts)
	const [pagination, setPagination] = useState(
		initialPagination || {
			page: 1,
			pageSize: 3,
			pageCount: 1,
			total: 0
		}
	)
	const [isLoading, setIsLoading] = useState(false)
	const [pageIndex, setPageIndex] = useState(1)

	useEffect(() => {
		if (slug) {
			const fetchData = async () => {
				setIsLoading(true)
				try {
					const data = await fetchProductsByCategorySlug(slug, pageIndex)
					setProducts(data.products || [])
					setPagination(data.pagination || pagination) // Fall back to previous pagination state if needed
				} catch (error) {
					console.error('Ошибка загрузки товаров', error)
				} finally {
					setIsLoading(false)
				}
			}
			fetchData()
		}
	}, [slug, pageIndex])

	const totalPages = pagination.pageCount || 1

	const handlePrevPage = () => {
		if (pageIndex > 1) setPageIndex(pageIndex - 1)
	}

	const handleNextPage = () => {
		if (pageIndex < totalPages) setPageIndex(pageIndex + 1)
	}

	return (
		<div className="w-full md:py-20 relative">
			<Wrapper>
				<div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
					<h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						{slug || 'Категория не найдена'}
					</h1>
				</div>

				{isLoading ? (
					<Loader />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
						{products.map((product) => (
							<ProductCard key={product.slug} data={product} />
						))}
					</div>
				)}

				<Pagination
					pageIndex={pageIndex}
					totalPages={totalPages}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
				/>
			</Wrapper>

			{isLoading && (
				<div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
					<img src="/logo.svg" width={150} alt="Loading..." />
					<span className="text-2xl font-medium">Loading...</span>
				</div>
			)}
		</div>
	)
}

export default CategoryPage

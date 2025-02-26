'use client'

import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import { useActions } from '@/hooks/useActions'
import {
	selectProductError,
	selectProductIsLoading,
	selectProducts,
	selectProductPagination
} from '@/store/product/product.selectors'

import ProductCard from '@/components/ui/ProductCard'
import Wrapper from '@/components/layout/Wrapper'
import Loader from '@/components/ui/Loader/Loader'
import Pagination from '@/components/ui/Pagination'

interface CategoryPageProps {
	slug: string | undefined
}

const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
	const [pageIndex, setPageIndex] = useState<number>(1)
	const [isMounted, setIsMounted] = useState(false)

	const products = useAppSelector(selectProducts)
	const isLoading = useAppSelector(selectProductIsLoading)
	const error = useAppSelector(selectProductError)
	const pagination = useAppSelector(selectProductPagination) || {
		page: 1,
		pageSize: 12,
		pageCount: 1,
		total: 0
	}
	const { fetchProductsByCategorySlug } = useActions()

	// Ensuring that this component only runs on the client side
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Fetch products when slug or pageIndex changes
	useEffect(() => {
		if (slug) {
			fetchProductsByCategorySlug({ slug, page: pageIndex })
		}
	}, [slug, pageIndex])

	if (!isMounted) return null // Prevent rendering during SSR

	if (isLoading) return <Loader />
	if (error) return <p className="text-red-500">{error}</p>

	// Get the total number of pages from pagination
	const totalPages = pagination.pageCount || 1

	// Pagination functions
	const handlePrevPage = () => {
		if (pageIndex > 1) {
			setPageIndex(pageIndex - 1)
		}
	}

	const handleNextPage = () => {
		if (pageIndex < totalPages) {
			setPageIndex(pageIndex + 1)
		}
	}

	return (
		<div className="w-full md:py-20 relative">
			<Wrapper>
				<div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
					<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						{slug || 'Категория не найдена'}
					</div>
				</div>

				{/* Display products */}
				{!isLoading && !error && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
						{(products && Array.isArray(products) ? products : []).map((product) => (
							<ProductCard key={product.slug} data={product} />
						))}
					</div>
				)}

				{/* Pagination Buttons */}
				<Pagination
					pageIndex={pageIndex}
					totalPages={totalPages}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
				/>
			</Wrapper>

			{/* Loading Indicator */}
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

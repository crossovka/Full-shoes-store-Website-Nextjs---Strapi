'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ui/ProductCard'
import Wrapper from '@/components/layout/Wrapper'

// Массив с продуктами для теста
const products = {
	data: [
		{
			id: 1,
			attributes: {
				name: 'Nike Air Max 2023',
				slug: 'nike-air-max-2023',
				price: 7999,
				original_price: 9999,
				thumbnail: {
					data: {
						attributes: {
							url: '/slides/slide-1.png'
						}
					}
				}
			}
		},
		{
			id: 2,
			attributes: {
				name: 'Adidas UltraBoost 22',
				slug: 'adidas-ultraboost-22',
				price: 8999,
				original_price: 10999,
				thumbnail: {
					data: {
						attributes: {
							url: '/slides/slide-1.png'
						}
					}
				}
			}
		},
		{
			id: 3,
			attributes: {
				name: 'Puma Speed 300',
				slug: 'puma-speed-300',
				price: 6999,
				original_price: 7999,
				thumbnail: {
					data: {
						attributes: {
							url: '/slides/slide-1.png'
						}
					}
				}
			}
		}
	]
}

const Category = ({ category, slug }) => {
	const [pageIndex, setPageIndex] = useState<number>(1)
	const [data, setData] = useState(products)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		// Имитация задержки, как при настоящем запросе
		setTimeout(() => {
			setData(products)
			setIsLoading(false)
		}, 1000)
	}, [pageIndex])

	useEffect(() => {
		setPageIndex(1)
	}, [slug])

	return (
		<div className="w-full md:py-20 relative">
			<Wrapper>
				<div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
					<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						{category?.name || 'Test Category'}
					</div>
				</div>

				{/* products grid start */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
					{data?.data?.map((product) => (
						<ProductCard key={product?.id} data={product} />
					))}
				</div>
				{/* products grid end */}

				{/* PAGINATION BUTTONS START */}
				<div className="flex gap-3 items-center justify-center my-16 md:my-0">
					<button
						className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
						disabled={pageIndex === 1}
						onClick={() => setPageIndex(pageIndex - 1)}
					>
						Previous
					</button>

					<span className="font-bold">{`${pageIndex} of 2`}</span>

					<button
						className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
						disabled={pageIndex === 2}
						onClick={() => setPageIndex(pageIndex + 1)}
					>
						Next
					</button>
				</div>
				{/* PAGINATION BUTTONS END */}

				{isLoading && (
					<div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
						<img src="/logo.svg" width={150} />
						<span className="text-2xl font-medium">Loading...</span>
					</div>
				)}
			</Wrapper>
		</div>
	)
}

export default Category

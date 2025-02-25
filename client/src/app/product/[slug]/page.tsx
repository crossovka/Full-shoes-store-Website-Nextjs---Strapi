'use client'

import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import ReactMarkdown from 'react-markdown'
import 'react-toastify/dist/ReactToastify.css'

import { getDiscountedPricePercentage } from '@/utils/getDiscountedPricePercentage'

import { useAppSelector } from '@/store/store'
import { useActions } from '@/hooks/useActions'
import { selectError, selectIsLoading, selectProduct } from '@/store/product/product.selectors'

import ProductDetailsCarousel from '@/components/product/ProductDetailsCarousel'
import RelatedProducts from '@/components/product/RelatedProducts'
import Wrapper from '@/components/layout/Wrapper'
import Loader from '@/components/ui/Loader/Loader'

interface ProductDetailsProps {
	slug: string
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
	const { fetchProductBySlug } = useActions()
	const product = useAppSelector(selectProduct)
	const isLoading = useAppSelector(selectIsLoading)
	const error = useAppSelector(selectError)

	useEffect(() => {
		fetchProductBySlug(slug)
	}, [slug])

	if (isLoading) return <Loader />
	if (error) return <p className="text-red-500">{error}</p>

	const p = product

	const notify = () => {
		toast.success('Success. Check your cart!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		})
	}

	return (
		<div className="w-full md:py-20">
			<ToastContainer />
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* Left column: Image Carousel */}
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						<ProductDetailsCarousel images={Array.isArray(p.image?.data) ? p.image.data : []} />
					</div>

					{/* Right column: Product details */}
					<div className="flex-[1] py-3">
						<div className="text-[34px] font-semibold mb-2 leading-tight">{p.name}</div>
						<div className="text-lg font-semibold mb-5">{p.subtitle}</div>

						<div className="flex items-center">
							<p className="mr-2 text-lg font-semibold">MRP : &#8377;{p.price}</p>
							{p.original_price && (
								<>
									<p className="text-base font-medium line-through">&#8377;{p.original_price}</p>
									<p className="ml-auto text-base font-medium text-green-500">
										{getDiscountedPricePercentage(p.original_price, p.price)}% off
									</p>
								</>
							)}
						</div>

						<div className="text-md font-medium text-black/[0.5]">incl. of taxes</div>
						<div className="text-md font-medium text-black/[0.5] mb-20">
							(Also includes all applicable duties)
						</div>

						{/* Product Size Selection */}
						<div className="mb-10">
							<div className="flex justify-between mb-2">
								<div className="text-md font-semibold">Select Size</div>
								<div className="text-md font-medium text-black/[0.5] cursor-pointer">
									Size Guide
								</div>
							</div>

							<div id="sizesGrid" className="grid grid-cols-3 gap-2">
								{p.size?.data?.map((item, i) => (
									<div
										key={i}
										className={`border rounded-md text-center py-3 font-medium ${
											item.enabled
												? 'hover:border-black cursor-pointer'
												: 'cursor-not-allowed bg-black/[0.1] opacity-50'
										} ${selectedSize === item.size ? 'border-black' : ''}`}
										onClick={() => {
											if (item.enabled) {
												setSelectedSize(item.size)
												setShowError(false)
											}
										}}
									>
										{item.size}
									</div>
								))}
							</div>

							{showError && <div className="text-red-600 mt-1">Size selection is required</div>}
						</div>

						<button
							className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
							onClick={() => {
								if (!selectedSize) {
									setShowError(true)
								} else {
									notify()
									// dispatch(addToCart({ ...p, size: selectedSize }))
								}
							}}
						>
							Add to Cart
						</button>

						<button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
							Wishlist <IoMdHeartEmpty size={20} />
						</button>

						{/* Product Details */}
						<div>
							<div className="text-lg font-bold mb-5">Product Details</div>
							<div className="markdown text-md mb-5">
								<ReactMarkdown>{p.description}</ReactMarkdown>
							</div>
						</div>
					</div>
				</div>
				<RelatedProducts products={[]} /> {/* Можно передавать товары из Redux */}
			</Wrapper>
		</div>
	)
}

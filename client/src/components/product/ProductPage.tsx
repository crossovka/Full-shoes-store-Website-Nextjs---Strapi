'use client'

import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import 'react-toastify/dist/ReactToastify.css'

import { getDiscountedPricePercentage } from '@/utils/getDiscountedPricePercentage'
import { useAppSelector, useAppDispatch } from '@/store/store'
import { useActions } from '@/hooks/useActions'
import { addToCart } from '@/store/cart/cart.slice'
import {
	selectProductError,
	selectProductIsLoading,
	selectProduct
} from '@/store/product/product.selectors'

import ProductDetailsCarousel from '@/components/product/ProductDetailsCarousel'
import RelatedProducts from '@/components/product/RelatedProducts'
import Wrapper from '@/components/layout/Wrapper'
import Loader from '@/components/ui/Loader/Loader'
import ProductDescription from './ProductDescription'

interface ProductPageProps {
	slug: string
}

export default function ProductPage({ slug }: ProductPageProps) {
	const { fetchProductBySlug } = useActions()
	const product = useAppSelector(selectProduct)
	const isLoading = useAppSelector(selectProductIsLoading)
	const error = useAppSelector(selectProductError)
	const dispatch = useAppDispatch()
	const [selectedSize, setSelectedSize] = useState<string | null>(null)
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		fetchProductBySlug(slug)
	}, [slug])

	useEffect(() => {
		console.log('Product data:', product)
	}, [product])

	if (isLoading) return <Loader />
	if (error) return <p className="text-red-500">{error}</p>
	if (!product) return <p className="text-red-500">Ошибка: товар не найден</p>

	const p = product

	// Toast уведомление для добавления товара в корзину
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

	const handleAddToCart = () => {
		if (!selectedSize) {
			setShowError(true)
		} else {
			// Добавляем товар в корзину
			dispatch(addToCart({ ...p, size: selectedSize, quantity: 1 }))
			notify()
		}
	}

	return (
		<div className="w-full md:py-20">
			<ToastContainer />
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* Left column: Image Carousel */}
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						{Array.isArray(p.image) && p.image.length > 0 && (
							<ProductDetailsCarousel images={p.image} />
						)}
					</div>

					{/* Right column: Product details */}
					<div className="flex-[1] py-3">
						{p.name && <div className="text-[34px] font-semibold mb-2 leading-tight">{p.name}</div>}
						{p.subtitle && <div className="text-lg font-semibold mb-5">{p.subtitle}</div>}

						<div className="flex items-center">
							{p.price && <p className="mr-2 text-lg font-semibold">MRP : &#8377;{p.price}</p>}
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
						{Array.isArray(p.size?.data) && p.size.data.length > 0 && (
							<div className="mb-10">
								<div className="flex justify-between mb-2">
									<div className="text-md font-semibold">Select Size</div>
									<div className="text-md font-medium text-black/[0.5] cursor-pointer">
										Size Guide
									</div>
								</div>

								<div id="sizesGrid" className="grid grid-cols-3 gap-2">
									{p.size.data.map((item, i) => (
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
						)}

						<button
							className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
							onClick={handleAddToCart}
						>
							Add to Cart
						</button>

						<button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
							Wishlist <IoMdHeartEmpty size={20} />
						</button>

						{/* Product Details */}
						<ProductDescription description={p.description} />
					</div>
				</div>
				{Array.isArray(p.relatedProducts) && p.relatedProducts.length > 0 && (
					<RelatedProducts products={p.relatedProducts} />
				)}
			</Wrapper>
		</div>
	)
}

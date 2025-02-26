'use client'

import Link from 'next/link'

import { StrapiImage } from './StrapiImage'

import { getDiscountedPricePercentage } from '@/utils/getDiscountedPricePercentage'
import { Product } from '@/store/product/product.types'

interface ProductCardProps {
	data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data: p }) => {
	console.log(p)
	return (
		<Link
			href={`/product/${p.slug}`}
			className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
		>
			<StrapiImage
				src={p.thumbnail?.url || '/placeholder.jpg'}
				alt={p.thumbnail?.alternativeText || 'No alternative text provided'}
				className="w-full h-auto"
				width={500}
				height={500}
			/>
			<div className="p-4 text-black/[0.9]">
				<h2 className="text-lg font-medium">{p.name}</h2>
				<div className="flex items-center text-black/[0.5]">
					<p className="mr-2 text-lg font-semibold">&#8377;{p.price}</p>

					{p.original_price && (
						<>
							<p className="text-base font-medium line-through">&#8377;{p.original_price}</p>
							<p className="ml-auto text-base font-medium text-green-500">
								{getDiscountedPricePercentage(p.original_price, p.price)}% off
							</p>
						</>
					)}
				</div>
			</div>
		</Link>
	)
}

export default ProductCard

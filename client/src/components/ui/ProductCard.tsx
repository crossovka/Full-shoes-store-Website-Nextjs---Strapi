import Link from 'next/link'

import { getDiscountedPricePercentage } from '@/utils/getDiscountedPricePercentage'
import { Product } from '@/store/product/product.types'
import { StrapiImage } from './StrapiImage'

interface ProductCardProps {
	data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data: p }) => {
	return (
		<article className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
			<Link href={`/product/${p.slug}`}>
			<StrapiImage
					src={p.thumbnail?.url || '/placeholder.jpg'}
					alt={p.thumbnail?.alternativeText || `Купить ${p.name} онлайн`}
					className="w-full h-auto"
					width={500}
					height={500}
					priority={true} // Оптимизация загрузки
				/>
				<div className="p-4 text-black/[0.9]">
					<h3 className="text-lg font-medium">{p.name}</h3>
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
		</article>
	)
}

export default ProductCard

import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { StrapiImage } from '../ui/StrapiImage'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'

interface ProductDetailsCarouselProps {
	images: {
		id: number
		attributes: {
			url: string
			name: string
		}
	}[]
}

const ProductDetailsCarousel: React.FC<ProductDetailsCarouselProps> = ({ images }) => {
	console.log('Images in carousel:', images) // Дебаг
	if (!images || images.length === 0) return null // Проверка на пустой массив

	return (
		<div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
			<Carousel
				infiniteLoop
				showIndicators={false}
				showStatus={false}
				thumbWidth={60}
				className="productCarousel"
				renderThumbs={() =>
					images.map((img) => {
						const thumbUrl = getStrapiMediaURL(img.url)
						return (
							<img
								key={img.id}
								src={thumbUrl}
								// alt={img.alternativeText}
								alt={img.hash}
								className="rounded-lg"
								width={60}
								height={60}
							/>
						)
					})
				}
			>
				{images.map((img) => (
					<StrapiImage
						key={img.id}
						src={img.url}
						// alt={img.alternativeText}
						alt={img.hash}
						className="rounded-lg"
						width={800}
						height={600}
					/>
				))}
			</Carousel>
		</div>
	)
}

export default ProductDetailsCarousel

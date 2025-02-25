import HeroBanner from '@/components/home/HeroBanner'
import Wrapper from '@/components/layout/Wrapper'
import ProductCard from '@/components/ProductCard'

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

export default function HomePage() {
	return (
		<section className="text-center py-10">
			<h1 className="text-4xl font-bold">Welcome to Online Shoe Store</h1>
			<p className="text-lg text-gray-600 mt-4">Find the best shoes for any occasion.</p>
			<HeroBanner />
			<Wrapper>
				{/* heading and paragaph start */}
				<div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
					<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						Cushioning for Your Miles
					</div>
					<div className="text-md md:text-xl">
						A lightweight Nike ZoomX midsole is combined with increased stack heights to help
						provide cushioning during extended stretches of running.
					</div>
				</div>
				{/* heading and paragaph end */}

				{/* products grid start */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
					{products?.data?.map((product) => (
						<ProductCard key={product?.id} data={product} />
					))}
				</div>
				{/* products grid end */}
			</Wrapper>
		</section>
	)
}

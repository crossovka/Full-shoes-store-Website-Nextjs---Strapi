import HeroBanner from '@/components/home/HeroBanner'
import Wrapper from '@/components/layout/Wrapper'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types/product.types'

type HomePageProps = {
	products: Product[]
}

export default function HomePage({ products }: HomePageProps) {
	return (
		<section className="text-center py-10">
			<h1 className="text-4xl font-bold">Welcome to Online Shoe Store</h1>
			<p className="text-lg text-gray-600 mt-4">Find the best shoes for any occasion.</p>

			<HeroBanner />
			<Wrapper>
				{/* Заголовок и описание */}
				<div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
					<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						Cushioning for Your Miles
					</div>
					<div className="text-md md:text-xl">
						A lightweight Nike ZoomX midsole is combined with increased stack heights to help
						provide cushioning during extended stretches of running.
					</div>
				</div>

				{/* Отображение продуктов */}
				{products.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
						{products.map((product) => (
							<ProductCard key={product.id} data={product} />
						))}
					</div>
				) : (
					<p className="text-lg text-gray-500">No products found.</p>
				)}
			</Wrapper>
		</section>
	)
}

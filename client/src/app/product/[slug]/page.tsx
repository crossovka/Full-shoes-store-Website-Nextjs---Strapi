import React from 'react'
import ProductPage from "@/components/product/ProductPage"

const CategoryLayout = ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = React.use(params) // Теперь params - это Promise, нужно его распаковать

	if (!slug) return <div>Loading...</div> // Можно добавить состояние загрузки

	return <ProductPage slug={slug} />
}

export default CategoryLayout

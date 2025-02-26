import React from 'react'
import CategoryPage from '@/components/category/CategoryPage'

const CategoryLayout = ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = React.use(params) // Теперь params - это Promise, нужно его распаковать

	if (!slug) return <div>Loading...</div> // Можно добавить состояние загрузки

	return <CategoryPage slug={slug} />
}

export default CategoryLayout

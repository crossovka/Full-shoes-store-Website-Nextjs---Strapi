import CategoryPage from '@/components/category/CategoryPage'
import { fetchProductsByCategorySlug } from '@/utils/api'

const CategoryRoute = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  try {
    const { products: initialProducts, pagination } = await fetchProductsByCategorySlug(slug, 1)
    return <CategoryPage slug={slug} initialProducts={initialProducts} initialPagination={pagination} />
  } catch (error) {
    console.error('Ошибка загрузки данных для категории', error)
    return <div>Ошибка загрузки данных для категории: {slug}</div>
  }
}

export default CategoryRoute

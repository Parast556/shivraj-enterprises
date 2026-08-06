import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryNav from '../components/CategoryNav'
import PageHeader from '../components/PageHeader'
import ProductGrid from '../components/ProductGrid'
import ProductSearch from '../components/ProductSearch'
import { getCategoryBySlug, getProductsByCategory } from '../data/catalogRuntime'
import { useProducts } from '../context/ProductsContext'

export default function CategoryPage() {
  const { slug = '' } = useParams()
  const { products, categories, hasLoaded } = useProducts()
  const category = getCategoryBySlug(categories, slug)
  const [searchQuery, setSearchQuery] = useState('')

  const categoryProducts = useMemo(
    () => getProductsByCategory(products, categories, slug),
    [products, categories, slug],
  )

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categoryProducts
    return categoryProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }, [categoryProducts, searchQuery])

  if (!category) {
    if (!hasLoaded) return null
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-forest">Category not found</h1>
        <p className="mt-3 text-forest/55">The category you are looking for does not exist.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-white hover:bg-forest-light"
        >
          Browse all products
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: category.name },
        ]}
      >
        <div className="max-w-xl">
          <ProductSearch
            id="category-search"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search in ${category.name}...`}
          />
          <p className="mt-3 text-xs text-forest/45">
            {filteredProducts.length} of {categoryProducts.length} products
          </p>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-forest/40">
            Browse other categories
          </p>
          <CategoryNav orientation="pills" />
        </div>

        <ProductGrid products={filteredProducts} />
      </section>
    </>
  )
}

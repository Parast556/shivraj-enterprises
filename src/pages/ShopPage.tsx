import { useMemo, useState } from 'react'
import CategoryNav from '../components/CategoryNav'
import PageHeader from '../components/PageHeader'
import ProductGrid from '../components/ProductGrid'
import ProductSearch from '../components/ProductSearch'
import { searchProducts } from '../data/catalogRuntime'
import { useProducts } from '../context/ProductsContext'

export default function ShopPage() {
  const { products, categories, hasLoaded } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const filteredProducts = useMemo(
    () => searchProducts(products, categories, searchQuery),
    [products, categories, searchQuery],
  )

  if (!hasLoaded) return null

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="All Products"
        description="Browse our complete collection of handcrafted decorative pieces. Use search or filter by category to find exactly what you need."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'All Products' },
        ]}
      >
        <div className="max-w-xl">
          <ProductSearch value={searchQuery} onChange={setSearchQuery} />
          <p className="mt-3 text-xs text-forest/45">
            {filteredProducts.length} of {products.length} products
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-forest/35">
            Filter by category
          </p>
          <CategoryNav orientation="pills" />
        </div>

        <ProductGrid products={filteredProducts} />
      </section>
    </>
  )
}

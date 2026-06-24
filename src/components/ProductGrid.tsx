import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = 'No products found' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="surface-card border-dashed px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-beige shadow-soft">
          <svg className="h-7 w-7 text-forest/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="mt-5 font-display text-xl font-semibold text-forest">{emptyMessage}</p>
        <p className="mt-2 text-sm text-forest/45">Try adjusting your search or browse categories</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import ProductSearch from '../components/ProductSearch'
import { searchProducts } from '../data/catalogRuntime'
import { useProducts } from '../context/ProductsContext'

export default function HomePage() {
  const { products, categories, hasLoaded } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(
    () => searchProducts(products, categories, searchQuery),
    [products, categories, searchQuery],
  )

  const isSearching = searchQuery.trim().length > 0
  const featured = isSearching ? filteredProducts : products.slice(0, 8)

  if (!hasLoaded) return null

  return (
    <>
      <Hero />

      <section id="search" className="relative z-10 mx-auto max-w-2xl px-4 -mt-12 sm:-mt-14 sm:px-6">
        <div className="rounded-2xl border border-forest/[0.06] bg-white/95 p-2.5 shadow-float backdrop-blur-sm">
          <ProductSearch
            id="home-search"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search statues, decor, gifts..."
          />
        </div>
        {isSearching && (
          <p className="mt-3 text-center text-xs text-forest/45">
            {filteredProducts.length} of {products.length} products
            {searchQuery && ` matching "${searchQuery.trim()}"`}
          </p>
        )}
      </section>

      {isSearching && (
        <section id="search-results" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <div className="mb-8">
            <p className="section-eyebrow-left">Search Results</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-forest sm:text-3xl">
              {filteredProducts.length > 0 ? 'Products found' : 'No matches'}
            </h2>
          </div>
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No products match your search"
          />
        </section>
      )}

      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <p className="section-eyebrow-centered">Shop by Category</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
            Curated Collections
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-forest/55">
            Find the perfect piece for every space — from temple decor to thoughtful gifts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </section>

      {!isSearching && (
        <section className="border-y border-forest/[0.06] bg-white/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="section-eyebrow-left">Featured</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">
                  Popular Picks
                </h2>
                <p className="mt-3 max-w-md text-sm text-forest/55">
                  Handpicked favourites from our latest collection.
                </p>
              </div>
              <Link to="/shop" className="btn-outline shrink-0">
                View all {products.length} products
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-12">
              <ProductGrid products={featured} />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-forest px-8 py-14 text-center shadow-card sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,98,0.12),transparent_55%)]" />
          <div className="relative">
          <p className="section-eyebrow-centered text-gold-light">Personal Assistance</p>
          <h2 className="mt-5 font-display text-2xl font-semibold text-white sm:text-3xl">
            Need help choosing the right piece?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Our team is happy to guide you via WhatsApp — share your space or gifting occasion.
          </p>
          <a
            href="https://wa.me/919917202763"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8"
          >
            Chat with us
          </a>
          </div>
        </div>
      </section>
    </>
  )
}

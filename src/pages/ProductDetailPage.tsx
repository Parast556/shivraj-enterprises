import { Link, useParams } from 'react-router-dom'
import AddToCartButton from '../components/AddToCartButton'
import ProductGrid from '../components/ProductGrid'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import { useImageLightbox } from '../context/ImageLightboxContext'
import {
  getCategoryBySlug,
  getProductById,
  getRelatedProducts,
} from '../data/catalogRuntime'
import { useProducts } from '../context/ProductsContext'
import { getProductEnquiryUrl } from '../utils/whatsapp'
import { useState } from 'react'

export default function ProductDetailPage() {
  const { id = '' } = useParams()
  const { products, categories, hasLoaded } = useProducts()
  const product = getProductById(products, id)
  const { openPreview } = useImageLightbox()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    if (!hasLoaded) return null
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-forest">Product not found</h1>
        <p className="mt-3 text-forest/55">This product may have been removed or the link is incorrect.</p>
        <Link to="/shop" className="btn-forest mt-8">
          Browse all products
        </Link>
      </div>
    )
  }

  const productCategories = product.categories
    .map((slug) => getCategoryBySlug(categories, slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)
  const related = getRelatedProducts(products, product)

  return (
    <>
      <div className="border-b border-forest/[0.06] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-forest/45" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-gold-dark">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop" className="transition-colors hover:text-gold-dark">Shop</Link>
            {productCategories[0] && (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  to={`/category/${productCategories[0].slug}`}
                  className="transition-colors hover:text-gold-dark"
                >
                  {productCategories[0].name}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span className="text-forest/70 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <button
            type="button"
            onClick={(event) =>
              openPreview({
                src: product.image,
                alt: product.name,
                title: product.name,
                productId: product.id,
                triggerElement: event.currentTarget,
              })
            }
            className="group relative flex aspect-[4/5] cursor-zoom-in items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-beige via-beige to-beige-dark/90 shadow-card ring-1 ring-forest/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
            aria-label={`View ${product.name} in full size`}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-forest shadow-md backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Full preview
            </span>
          </button>

          <div className="flex flex-col">
            {productCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {productCategories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="inline-flex rounded-full bg-beige/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-forest/55 ring-1 ring-forest/[0.06] transition-all duration-200 hover:bg-beige hover:text-gold-dark hover:ring-gold/25"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-forest/65 sm:text-lg">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-forest/50">Quantity</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} quantity={quantity} className="flex-1" />
              <a
                href={getProductEnquiryUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-forest/15 px-6 py-3 text-sm font-medium text-forest transition-all hover:border-gold/40 hover:bg-beige"
              >
                Enquire on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-forest/[0.06] bg-beige/40 p-5 shadow-soft sm:grid-cols-3">
              {[
                { label: 'Handcrafted', desc: 'Artisan made' },
                { label: 'Premium', desc: 'Quality finish' },
                { label: 'Gifting', desc: 'Ready to gift' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest/40">{item.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-forest">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-forest/5 pt-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow-left">You may also like</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-forest">
                  Related Products
                </h2>
              </div>
              {productCategories[0] && (
                <Link
                  to={`/category/${productCategories[0].slug}`}
                  className="link-subtle hidden text-sm sm:inline-flex"
                >
                  View all in {productCategories[0].name}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            <ProductGrid products={related} />
          </div>
        )}
      </section>
    </>
  )
}

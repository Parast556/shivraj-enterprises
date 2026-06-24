import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryBySlug } from '../data/catalog'
import { useImageLightbox } from '../context/ImageLightboxContext'
import type { Product } from '../types'
import AddToCartButton from './AddToCartButton'
import ProductImage from './ProductImage'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const primaryCategory = product.categories[0]
    ? getCategoryBySlug(product.categories[0])
    : undefined
  const { openPreview } = useImageLightbox()

  const handleImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    openPreview({
      src: product.image,
      alt: product.name,
      title: product.name,
      productId: product.id,
      triggerElement: event.currentTarget,
    })
  }

  return (
    <article
      className="group surface-card-interactive flex flex-col overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      <button
        type="button"
        onClick={handleImageClick}
        className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-gradient-to-b from-beige to-beige-dark/80 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-inset"
        aria-label={`Preview ${product.name} image`}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {primaryCategory && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest/65 shadow-sm backdrop-blur-sm">
            {primaryCategory.tagline}
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-forest shadow-float backdrop-blur-sm">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Full preview
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link to={`/products/${product.id}`} className="group/title">
          <h3 className="font-display text-lg font-semibold leading-snug text-forest transition-colors duration-200 group-hover/title:text-gold-dark sm:text-xl">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest/55 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-forest/[0.06] pt-4">
          <Link to={`/products/${product.id}`} className="link-subtle">
            View details
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <AddToCartButton product={product} variant="icon" />
        </div>
      </div>
    </article>
  )
}

import { Link } from 'react-router-dom'
import { getCategoryCoverImage, getCategoryProductCount } from '../data/catalogRuntime'
import { useProducts } from '../context/ProductsContext'
import type { Category } from '../types'
import ProductImage from './ProductImage'

interface CategoryCardProps {
  category: Category
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const { products, categories } = useProducts()
  const count = getCategoryProductCount(products, categories, category.slug)
  const cover = getCategoryCoverImage(products, categories, category.slug)

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-forest shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <ProductImage
        src={cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest/55 to-forest/15 transition-all duration-500 group-hover:via-forest/65" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-gold/30" />

      <div className="relative p-6 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
          {category.tagline}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold text-white sm:text-2xl">
          {category.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">{category.description}</p>
        <p className="link-subtle mt-5 text-gold-light hover:text-gold-light">
          {count} products
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </div>
    </Link>
  )
}

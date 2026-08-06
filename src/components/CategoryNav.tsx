import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

interface CategoryNavProps {
  orientation?: 'horizontal' | 'pills'
  onNavigate?: () => void
}

export default function CategoryNav({ orientation = 'horizontal', onNavigate }: CategoryNavProps) {
  const location = useLocation()
  const { categories } = useProducts()

  const isActive = (slug: string) => location.pathname === `/category/${slug}`

  if (orientation === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            onClick={onNavigate}
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive(category.slug)
                ? 'bg-forest text-white shadow-md ring-1 ring-forest/20'
                : 'bg-white text-forest/65 shadow-soft ring-1 ring-forest/[0.08] hover:bg-beige hover:text-forest hover:ring-gold/25'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Categories">
      {categories.map((category) => (
        <Link
          key={category.slug}
          to={`/category/${category.slug}`}
          onClick={onNavigate}
          className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 ${
            isActive(category.slug)
              ? 'bg-beige text-forest shadow-sm'
              : 'text-forest/55 hover:bg-beige/70 hover:text-forest'
          }`}
        >
          {category.name.split(' ')[0]}
        </Link>
      ))}
    </nav>
  )
}

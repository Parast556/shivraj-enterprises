import type { Category, Product } from '../types'

const DEFAULT_PLACEHOLDER = '/images/placeholder.svg'

function getCategoryBySlugInternal(categories: Category[], slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(products: Product[], categories: Category[], slug: string): Product[] {
  const category = getCategoryBySlugInternal(categories, slug)
  const ids = new Set(category?.productIds ?? [])
  return products.filter((p) => ids.has(p.id))
}

export function getCategoryProductCount(products: Product[], categories: Category[], slug: string): number {
  return getProductsByCategory(products, categories, slug).length
}

export function getCategoryCoverImage(products: Product[], categories: Category[], slug: string): string {
  const ids = getCategoryBySlugInternal(categories, slug)?.productIds ?? []
  const first = products.find((p) => ids.includes(p.id))
  return first?.image ?? DEFAULT_PLACEHOLDER
}

export function getCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  return getCategoryBySlugInternal(categories, slug)
}

export function searchProducts(products: Product[], categories: Category[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products

  return products.filter((product) => {
    const categoryNames = product.categories
      .map((slug) => getCategoryBySlugInternal(categories, slug)?.name.toLowerCase() ?? '')
      .join(' ')

    return (
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      categoryNames.includes(q)
    )
  })
}

export function getRelatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  if (product.categories.length === 0) return []

  return products
    .filter(
      (p) =>
        p.id !== product.id && p.categories.some((slug) => product.categories.includes(slug)),
    )
    .slice(0, limit)
}


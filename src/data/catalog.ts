import { categories } from './categories.config'
import { products as productConfigs } from './products.config'
import type { Category, Product } from '../types'

export { categories }

export type ProductInput = Omit<Product, 'categories'>

const categoryMap = buildCategoryMap()

export const allProducts: Product[] = attachCategoriesToProducts(productConfigs)

function buildCategoryMap(): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const category of categories) {
    for (const productId of category.productIds) {
      const existing = map.get(productId) ?? []
      if (!existing.includes(category.slug)) {
        map.set(productId, [...existing, category.slug])
      }
    }
  }
  return map
}

export function attachCategoriesToProducts(items: ProductInput[]): Product[] {
  return items.map((product) => ({
    ...product,
    categories: categoryMap.get(product.id) ?? [],
  }))
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getProductIdsForCategory(slug: string): string[] {
  return getCategoryBySlug(slug)?.productIds ?? []
}

export function getProductsByCategory(products: Product[], slug: string): Product[] {
  const ids = new Set(getProductIdsForCategory(slug))
  return products.filter((p) => ids.has(p.id))
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategoryProductCount(products: Product[], slug: string): number {
  return getProductsByCategory(products, slug).length
}

export function getCategoryCoverImage(products: Product[], slug: string): string {
  const ids = getProductIdsForCategory(slug)
  const first = products.find((p) => ids.includes(p.id))
  return first?.image ?? '/images/placeholder.svg'
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products

  return products.filter((product) => {
    const categoryNames = product.categories
      .map((slug) => getCategoryBySlug(slug)?.name.toLowerCase() ?? '')
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
        p.id !== product.id &&
        p.categories.some((slug) => product.categories.includes(slug)),
    )
    .slice(0, limit)
}

export function productBelongsToCategory(product: Product, slug: string): boolean {
  return product.categories.includes(slug)
}

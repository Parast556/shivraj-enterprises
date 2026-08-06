import type { Category, Product } from '../types'
import { getSupabaseClient } from '../lib/supabaseClient'

interface SupabaseCategoryRow {
  slug: string
  name: string
  tagline: string
  description: string
}

interface SupabaseProductRow {
  id: string
  name: string
  description: string
  image_url: string
}

interface SupabaseProductCategoryRow {
  product_id: string
  category_slug: string
}

export async function fetchSupabaseCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { data: categoryRows, error: categoriesError } = await supabase
    .from('categories')
    .select('slug,name,tagline,description')
    .order('sort_order', { ascending: true })

  if (categoriesError) throw categoriesError

  const { data: productRows, error: productsError } = await supabase
    .from('products')
    .select('id,name,description,image_url')
    .order('sort_order', { ascending: true })

  if (productsError) throw productsError

  const { data: productCategoryRows, error: pcError } = await supabase
    .from('product_categories')
    .select('product_id,category_slug')

  if (pcError) throw pcError

  const categories = (categoryRows ?? []).map(
    (c: SupabaseCategoryRow): Category => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      description: c.description,
      productIds: [],
    }),
  )

  // Build membership maps from join table.
  const categoryToProductIds = new Map<string, string[]>()
  const productToCategorySlugs = new Map<string, string[]>()

  for (const row of (productCategoryRows ?? []) as SupabaseProductCategoryRow[]) {
    const catSlug = row.category_slug
    const productId = row.product_id

    categoryToProductIds.set(catSlug, [...(categoryToProductIds.get(catSlug) ?? []), productId])
    productToCategorySlugs.set(productId, [...(productToCategorySlugs.get(productId) ?? []), catSlug])
  }

  // Deduplicate while preserving insertion order.
  for (const [slug, ids] of categoryToProductIds.entries()) {
    categoryToProductIds.set(
      slug,
      Array.from(new Set(ids)),
    )
  }
  for (const [id, slugs] of productToCategorySlugs.entries()) {
    productToCategorySlugs.set(
      id,
      Array.from(new Set(slugs)),
    )
  }

  const products = (productRows ?? []).map((p: SupabaseProductRow): Product => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: p.image_url,
    categories: productToCategorySlugs.get(p.id) ?? [],
  }))

  const categoriesBySlug = new Map(categories.map((c) => [c.slug, c] as const))
  for (const [slug, productIds] of categoryToProductIds.entries()) {
    const cat = categoriesBySlug.get(slug)
    if (cat) cat.productIds = productIds
  }

  return { products, categories }
}


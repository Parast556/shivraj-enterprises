import type { Category, Product } from '../types'
import { getSupabaseClient } from '../lib/supabaseClient'

function slugifyKebabCase(input: string): string {
  // URL-friendly kebab-case derived from arbitrary titles (e.g. "Statues & Sculptures").
  // - lowercase
  // - turn any run of non-alphanumeric characters into a single "-"
  // - trim leading/trailing "-"
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface SupabaseCategoryRow {
  category_id: string
  category_name: string
  tagline: string | null
  description: string | null
}

interface SupabaseProductRow {
  id: string
  name: string
  description: string | null
  image_url: string
}

interface SupabaseProductCategoryRow {
  product_id: string
  category_id: string
}

export async function fetchSupabaseCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { data: categoryRows, error: categoriesError } = await supabase
    .from('categories')
    .select('category_id,category_name,tagline,description')
    .order('category_id', { ascending: true })

  if (categoriesError) throw categoriesError

  const { data: productRows, error: productsError } = await supabase
    .from('products')
    .select('id,name,description,image_url')
    .order('id', { ascending: true })

  if (productsError) throw productsError

  const { data: productCategoryRows, error: pcError } = await supabase
    .from('product_category_map')
    .select('product_id,category_id')

  if (pcError) throw pcError

  const categories = (categoryRows ?? []).map(
    (c: SupabaseCategoryRow): Category => ({
      slug: slugifyKebabCase(c.category_name),
      name: c.category_name,
      tagline: c.tagline ?? '',
      description: c.description ?? '',
      productIds: [],
    }),
  )

  const categoryIdToSlug = new Map<string, string>()
  for (const c of (categoryRows ?? []) as SupabaseCategoryRow[]) {
    categoryIdToSlug.set(String(c.category_id), slugifyKebabCase(c.category_name))
  }

  // Build membership maps from join table.
  const categoryToProductIds = new Map<string, string[]>()
  const productToCategorySlugs = new Map<string, string[]>()

  for (const row of (productCategoryRows ?? []) as SupabaseProductCategoryRow[]) {
    const catSlug = categoryIdToSlug.get(String(row.category_id))
    const productId = String(row.product_id)
    if (!catSlug) continue

    categoryToProductIds.set(catSlug, [...(categoryToProductIds.get(catSlug) ?? []), productId])
    productToCategorySlugs.set(productId, [...(productToCategorySlugs.get(productId) ?? []), catSlug])
  }

  // Deduplicate while preserving insertion order.
  for (const [slug, ids] of categoryToProductIds.entries()) {
    categoryToProductIds.set(slug, Array.from(new Set(ids)))
  }
  for (const [id, slugs] of productToCategorySlugs.entries()) {
    productToCategorySlugs.set(id, Array.from(new Set(slugs)))
  }

  const products = (productRows ?? []).map((p: SupabaseProductRow): Product => ({
    id: String(p.id),
    name: p.name,
    description: p.description ?? '',
    image: p.image_url,
    categories: productToCategorySlugs.get(String(p.id)) ?? [],
  }))

  const categoriesBySlug = new Map(categories.map((c) => [c.slug, c] as const))
  for (const [slug, productIds] of categoryToProductIds.entries()) {
    const cat = categoriesBySlug.get(slug)
    if (cat) cat.productIds = productIds
  }

  return { products, categories }
}


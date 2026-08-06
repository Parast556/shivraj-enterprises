import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fetchSupabaseCatalog } from '../data/supabaseCatalog'
import type { Category, Product } from '../types'

interface ProductsContextValue {
  products: Product[]
  categories: Category[]
  hasLoaded: boolean
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function hydrate() {
      try {
        const timeoutMs = 6000
        const res = await Promise.race([
          fetchSupabaseCatalog(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Supabase catalog fetch timeout after ${timeoutMs}ms`)), timeoutMs),
          ),
        ])
        if (cancelled) return
        setProducts(res.products)
        setCategories(res.categories)
      } catch (err) {
        // Supabase-only: if misconfigured/failed, keep empty arrays.
        console.warn('[ProductsProvider] Supabase catalog hydration failed:', err)
      } finally {
        if (!cancelled) setHasLoaded(true)
      }
    }

    void hydrate()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ products, categories, hasLoaded }), [products, categories, hasLoaded])

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { allProducts } from '../data/catalog'
import type { Product } from '../types'

interface ProductsContextValue {
  products: Product[]
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ products: allProducts }), [])

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}

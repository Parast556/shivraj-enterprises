import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProductById } from '../data/catalog'
import { useProducts } from './ProductsContext'
import type { CartItem, Product } from '../types'

const STORAGE_KEY = 'shivraj-cart'

interface CartLine extends CartItem {
  product: Product
}

interface CartContextValue {
  items: CartLine[]
  itemCount: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

function loadStoredItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts()
  const [items, setItems] = useState<CartItem[]>(loadStoredItems)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(products, item.productId)
          if (!product) return null
          return { ...item, product }
        })
        .filter((line): line is CartLine => line !== null),
    [items, products],
  )

  const addItem = useCallback(
    (productId: string, quantity = 1) => {
      if (!getProductById(products, productId)) return

      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId)
        if (existing) {
          return prev.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
          )
        }
        return [...prev, { productId, quantity }]
      })
    },
    [products],
  )

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items: lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart: (productId) => items.some((i) => i.productId === productId),
      getQuantity: (productId) => items.find((i) => i.productId === productId)?.quantity ?? 0,
    }),
    [lines, items, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

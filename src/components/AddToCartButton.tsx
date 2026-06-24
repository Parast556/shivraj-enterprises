import type { MouseEvent } from 'react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import type { Product } from '../types'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  variant?: 'primary' | 'secondary' | 'icon'
  className?: string
  label?: string
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'primary',
  className = '',
  label = 'Add to Cart',
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const { showToast } = useToast()
  const inCart = isInCart(product.id)

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id, quantity)
    showToast(`${product.name} added to cart`)
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white shadow-sm transition-all duration-200 hover:bg-forest-light hover:shadow-md active:scale-95 ${className}`}
        aria-label={inCart ? 'Add another to cart' : 'Add to cart'}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </button>
    )
  }

  const base =
    variant === 'primary'
      ? 'btn-forest'
      : 'btn-outline border-forest/15 bg-white'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} px-6 py-3 ${className}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {inCart ? 'Add Another' : label}
    </button>
  )
}

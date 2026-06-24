import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link
      to="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest/60 transition-all duration-200 hover:bg-beige hover:text-forest"
      aria-label={`Cart, ${itemCount} items`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest shadow-sm ring-2 ring-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

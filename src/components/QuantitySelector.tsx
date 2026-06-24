interface QuantitySelectorProps {
  quantity: number
  onChange: (quantity: number) => void
  size?: 'sm' | 'md'
}

export default function QuantitySelector({ quantity, onChange, size = 'md' }: QuantitySelectorProps) {
  const btnClass =
    size === 'sm'
      ? 'flex h-8 w-8 items-center justify-center'
      : 'flex h-10 w-10 items-center justify-center'

  return (
    <div className="inline-flex items-center rounded-xl border border-forest/[0.08] bg-white shadow-soft">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className={`${btnClass} rounded-l-xl text-forest/55 transition-colors duration-200 hover:bg-beige disabled:opacity-30`}
        aria-label="Decrease quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <span className={`min-w-10 border-x border-forest/[0.06] text-center font-semibold text-forest ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className={`${btnClass} rounded-r-xl text-forest/55 transition-colors duration-200 hover:bg-beige`}
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import { useCart } from '../context/CartContext'
import { getCartOrderUrl } from '../utils/whatsapp'

export default function CartPage() {
  const { items, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  if (itemCount === 0) {
    return (
      <>
        <PageHeader
          eyebrow="Your Cart"
          title="Cart is empty"
          description="Discover handcrafted decor pieces and add your favourites to the cart."
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Cart' },
          ]}
        />
        <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-beige">
            <svg className="h-9 w-9 text-forest/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="mt-6 font-display text-xl font-semibold text-forest">Nothing here yet</p>
          <p className="mt-2 text-sm text-forest/50">Start exploring our collection and add items you love.</p>
          <Link to="/shop" className="btn-forest mt-8">
            Start Shopping
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Your Cart"
        title={`${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`}
        description="Review your selections and send your enquiry via WhatsApp."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Cart' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-forest/[0.06] surface-card overflow-hidden">
              {items.map((line) => (
                <li key={line.productId} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
                  <Link
                    to={`/products/${line.product.id}`}
                    className="flex shrink-0 items-center gap-4 sm:gap-5"
                  >
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-beige-dark sm:h-28 sm:w-24">
                      <ProductImage
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 sm:hidden">
                      <p className="font-display text-base font-semibold text-forest line-clamp-2">
                        {line.product.name}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="hidden min-w-0 sm:block">
                      <Link
                        to={`/products/${line.product.id}`}
                        className="font-display text-lg font-semibold text-forest transition-colors hover:text-gold-dark line-clamp-2"
                      >
                        {line.product.name}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <QuantitySelector
                        quantity={line.quantity}
                        onChange={(q) => updateQuantity(line.productId, q)}
                        size="sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-forest/35 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${line.product.name} from cart`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={clearCart}
              className="mt-4 text-sm font-medium text-forest/40 transition-colors hover:text-red-500"
            >
              Clear cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 surface-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-forest">Your Selection</h2>
              <p className="mt-2 text-sm text-forest/55">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} ready to enquire about.
              </p>

              <a
                href={getCartOrderUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-forest mt-8 w-full"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </a>

              <Link
                to="/shop"
                className="btn-outline mt-4 w-full"
              >
                Continue Shopping
              </Link>

              <p className="mt-6 text-center text-xs leading-relaxed text-forest/40">
                Share your selection via WhatsApp and our team will assist you further.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

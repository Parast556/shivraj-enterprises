import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductImage from './ProductImage'

export default function Hero() {
  const { products } = useProducts()
  const heroImage = products[0]?.image ?? '/images/1.jpeg'

  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <ProductImage
          src={heroImage}
          alt=""
          className="h-full w-full object-cover opacity-[0.22] scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest/92 to-forest" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,36,25,0.45)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-48">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow-centered animate-fade-in-up text-gold-light">
            Premium Home Decor
          </p>
          <h1 className="animate-fade-in-up animation-delay-100 mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem] text-balance">
            Shivraj Enterprises
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Handcrafted decorative statues and elegant home decor pieces that bring beauty and serenity to your space.
          </p>
          <div className="animate-fade-in-up animation-delay-300 mt-12 flex justify-center">
            <Link to="/shop" className="btn-gold">
              Shop Collection
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

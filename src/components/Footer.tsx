import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

export default function Footer() {
  const { categories } = useProducts()

  return (
    <footer id="footer" className="border-t border-forest/10 bg-forest-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-2xl font-semibold tracking-wide text-white">
              Shivraj <span className="text-gold-light">Enterprises</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Handcrafted decorative statues and home decor from Jaipur, Rajasthan.
            </p>
          </div>

          <div>
            <p className="section-eyebrow-left text-[10px] text-gold-light/80">Shop</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/shop" className="text-white/60 transition-colors duration-200 hover:text-gold-light">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white/60 transition-colors duration-200 hover:text-gold-light">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="section-eyebrow-left text-[10px] text-gold-light/80">Categories</p>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-white/60 transition-colors duration-200 hover:text-gold-light"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-eyebrow-left text-[10px] text-gold-light/80">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>
                <a href="tel:+919917202763" className="transition-colors duration-200 hover:text-gold-light">
                  +91 99172 02763
                </a>
              </li>
              <li>Meerut, Uttar Pradesh, India</li>
              <li>
                <a
                  href="https://wa.me/919917202763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-gold-light"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} Shivraj Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

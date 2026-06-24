import { Outlet } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { ImageLightboxProvider } from '../context/ImageLightboxContext'
import { ProductsProvider } from '../context/ProductsContext'
import { ToastProvider } from '../context/ToastContext'
import { useRouteScrollRestoration } from '../hooks/useRouteScrollRestoration'
import Header from './Header'
import Footer from './Footer'
import ChatbotWidget from './Chatbot/ChatbotWidget'

export default function Layout() {
  useRouteScrollRestoration()

  return (
    <ProductsProvider>
      <ImageLightboxProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
            </div>
            <ChatbotWidget />
          </ToastProvider>
        </CartProvider>
      </ImageLightboxProvider>
    </ProductsProvider>
  )
}

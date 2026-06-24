import type { Product } from '../types'

const WHATSAPP_NUMBER = '919917202763'

export function getProductEnquiryUrl(product: Product): string {
  const message = `Hi, I'm interested in "${product.name}". Could you share more details?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getCartOrderUrl(items: Array<{ product: Product; quantity: number }>): string {
  const lines = items.map(
    (item, index) => `${index + 1}. ${item.product.name} × ${item.quantity}`,
  )
  const message = [
    'Hi, I would like to enquire about the following items:',
    '',
    ...lines,
    '',
    'Please share availability and details.',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

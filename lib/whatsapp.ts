import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from './constants'

export function getWhatsAppUrl(message?: string): string {
  const msg = encodeURIComponent(message ?? WHATSAPP_DEFAULT_MESSAGE)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

// WhatsApp booking assistant (Cloud API number run by the PMS).
// Staff chat stays on 0911 230 0062 via the floating WhatsAppButton.
export const whatsappBookingNumber = '2349136360322'

// The PMS bot reads "Book <apartment name>" to pick the apartment,
// so the text must stay in exactly this format and match the names in data/apartments.js.
export const bookOnWhatsAppUrl = (apartment) => {
  const message = apartment ? `Book ${apartment.name}` : 'Book an apartment'
  return `https://wa.me/${whatsappBookingNumber}?text=${encodeURIComponent(message)}`
}

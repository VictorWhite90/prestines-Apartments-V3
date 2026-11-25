import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const LAST_UPDATED = '25 November 2026'

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: [
      'Prestine Apartments is operated by Prestine Hospitality Concepts Ltd (RC 8206579), which is responsible for your personal information. We provide serviced apartments in Apo-Dutse and Lugbe, Abuja. This policy explains what personal information we collect when you visit prestineapartment.com, book a stay, or message us on WhatsApp, and how we use it.',
      'Our office is at Plot 219, Martin Ejembi Crescent, Opposite Queens specialist hospital, Apo-Dutse, Abuja 900110, Federal Capital Territory, Nigeria.',
    ],
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    list: [
      'Booking details: your title, name, email address, phone number, check-in and check-out dates, number of guests and the apartment you choose.',
      'WhatsApp messages: when you message us on WhatsApp, including through our automated booking assistant, we receive your WhatsApp phone number, your WhatsApp profile name and the messages you send.',
      'Payment information: payments are processed by Paystack. We receive a payment reference and the amount paid. We never see or store your card details.',
      'Identification: a valid means of identification is checked on arrival, as set out in our booking policies.',
      'Website usage: we use Google Tag Manager and the Meta (Facebook) Pixel, which use cookies to measure visits and the performance of our adverts.',
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    list: [
      'To check availability, take your booking and payment, and confirm your reservation.',
      'To send you booking confirmations, receipts and messages about your stay.',
      'To answer your questions on WhatsApp, by phone or by email.',
      'To understand how visitors use our website and improve it and our adverts.',
      'To meet our legal, accounting and security obligations.',
    ],
    after: 'We do not sell your personal information.',
  },
  {
    id: 'who-we-share-with',
    title: 'Who we share it with',
    body: [
      'We share your information only with the service providers who help us run bookings, and only as much as they need:',
    ],
    list: [
      'Our property management and booking system provider, which runs our reservations and WhatsApp booking assistant.',
      'Meta (WhatsApp), which carries our WhatsApp conversations.',
      'Paystack, which processes payments.',
      'Google (Firebase and Google Tag Manager) and EmailJS, which store booking records and send booking emails.',
      'Meta (Facebook Pixel), for advert measurement.',
    ],
    after: 'We may also disclose information where the law requires it, or to the security agencies as described in our booking policies.',
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    body: [
      'We keep booking and payment records for as long as we need them to provide your stay and to meet our accounting and legal obligations. WhatsApp conversations are kept for as long as needed to handle your enquiry or booking.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: [
      'Under the Nigeria Data Protection Act 2023, you can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. You can also object to us using it for marketing, and you can block our cookies in your browser settings.',
    ],
  },
  {
    id: 'data-deletion',
    title: 'Deleting your data',
    body: [
      'To ask us to delete your personal information, including your WhatsApp conversations with us, email Support@prestineapartment.com or call 0911 230 0062 from the number you used, with the subject "Data deletion request". We will confirm once it has been done. We may need to keep some booking and payment records where the law requires it, and we will tell you if so.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      'For any question about this policy or your information, email Support@prestineapartment.com or call 0911 230 0062.',
      'We may update this policy from time to time. The date at the top shows when it was last changed.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="bg-gold-600 text-white">
              <CardTitle className="text-3xl md:text-4xl font-bold text-center">
                Privacy Policy
              </CardTitle>
              <p className="text-center text-white/90 text-sm mt-2">Last updated: {LAST_UPDATED}</p>
            </CardHeader>
            <CardContent className="p-8 md:p-12 space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed mb-4">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.after && (
                    <p className="text-gray-700 leading-relaxed">{section.after}</p>
                  )}
                </section>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

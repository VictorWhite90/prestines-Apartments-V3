import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, Facebook, Instagram, Navigation } from 'lucide-react'
import TikTokIcon from '@/components/icons/TikTokIcon'
import LocateButton from '@/components/LocateButton'
import { prestineLocation } from '@/config/location'

export default function Contact() {
  const socialLinks = {
    facebook: 'https://www.facebook.com/share/1LHyhLiKuU/',
    instagram: 'https://www.instagram.com/prestineapartment?igsh=MXAyZnd1ZWg0MXZrNw==',
    tiktok: 'https://www.tiktok.com/@prestine.apartment?_r=1&_t=ZS-98DhFnExl4v',
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries, bookings, or assistance. We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-orange-600">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <MapPin className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        {prestineLocation.address}
                      </p>
                      <LocateButton className="mt-3 px-4 py-2 text-xs" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Phone className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:09112300062" className="text-orange-600 hover:text-orange-700 transition-colors">
                        09112300062
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Mail className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:Support@prestineapartment.com" className="text-orange-600 hover:text-orange-700 transition-colors">
                        Support@prestineapartment.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Social Media */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 border-t border-gray-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#1877F2] text-white hover:scale-105 flex items-center justify-center transition-transform"
                        aria-label="Facebook"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white hover:scale-105 flex items-center justify-center transition-transform"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        href={socialLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-black text-white hover:scale-105 flex items-center justify-center transition-transform"
                        aria-label="TikTok"
                      >
                        <TikTokIcon brandColor size={20} />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-orange-600 flex items-center gap-2">
                  <MapPin size={24} />
                  Locate Prestine Apartments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex h-full min-h-[360px] flex-col justify-between rounded-xl border border-orange-100 bg-gradient-to-br from-white via-orange-50/40 to-blue-50/50 p-6">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <Navigation size={26} />
                    </div>
                    <h3 className="mb-3 font-serif text-3xl text-gray-950">Need directions?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Open Prestine Apartments directly in Google Maps for live navigation, traffic-aware
                      routing, and easier arrival on mobile.
                    </p>
                    <p className="mt-5 text-sm font-medium text-gray-900">
                      {prestineLocation.address}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <LocateButton className="w-full sm:w-auto" />
                    <a
                      href={prestineLocation.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-md border border-gray-950 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-white sm:w-auto"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-orange-600">Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-semibold text-gray-900 mb-2 text-xl">Monday - Saturday</p>
                  <p className="text-gray-600">24/7</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2 text-xl">Sunday</p>
                  <p className="text-gray-600">Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

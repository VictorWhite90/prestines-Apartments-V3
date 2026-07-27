import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apartments } from '@/data/apartments'
import { ArrowRight, MapPin, Users, Home, Star, Bed, Bath, Wifi, ChevronLeft, ChevronRight } from 'lucide-react'
import { initAllTracking, trackFacebookPageView, trackGooglePageView } from '@/utils/tracking'

export default function Apartments() {
  // Reorder apartments: premium, standard, studio, deluxe, Lugbe last
  const reorderedApartments = [
    apartments.find(apt => apt.id === 'premium-apartment'), // 1 bedroom first
    apartments.find(apt => apt.id === 'standard-apartment'),
    apartments.find(apt => apt.id === 'classic-studio'),
    apartments.find(apt => apt.id === 'delux-royal'),
    apartments.find(apt => apt.id === 'prestige-suite'), // Lugbe last
  ].filter(Boolean)

  // Hero carousel - one slide for each of the apartments shown here
  const heroApartments = [
    apartments.find(apt => apt.id === 'premium-apartment'),
    apartments.find(apt => apt.id === 'standard-apartment'),
    apartments.find(apt => apt.id === 'classic-studio'), 
    apartments.find(apt => apt.id === 'delux-royal'),
    apartments.find(apt => apt.id === 'prestige-suite'),
  ].filter(Boolean)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroApartments.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroApartments.length])

  // Initialize tracking scripts
  useEffect(() => {
    initAllTracking()
    trackFacebookPageView()
    trackGooglePageView('/apartments')
  }, [])

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroApartments.length)
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroApartments.length) % heroApartments.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden max-w-full w-full">
      {/* Hero Section with Apartment Carousel */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden max-w-full w-full">
        {heroApartments.map((apartment, index) => (
          <div
            key={apartment.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentHeroSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={apartment.image}
              alt={apartment.name}
              className="w-full h-full object-cover max-w-full"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Apartment Info Overlay - Bottom Left */}
        <div className="absolute bottom-0 left-0 z-10 p-6 md:p-8 pb-16 md:pb-8">
          <motion.div
            key={heroApartments[currentHeroSlide]?.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-left text-white"
          >
            <h1
              className="text-lg sm:text-xl md:text-2xl font-serif font-light mb-2 tracking-tight"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.5)'
              }}
            >
              {heroApartments[currentHeroSlide]?.name}
            </h1>

            <div className="flex items-center gap-2 mb-4 text-white/90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{heroApartments[currentHeroSlide]?.location}</span>
            </div>

            <Link to={`/apartments/${heroApartments[currentHeroSlide]?.slug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                View Details & Book Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevHeroSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextHeroSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroApartments.map((apartment, index) => (
            <button
              key={apartment.id}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentHeroSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to ${apartment.name}`}
            />
          ))}
        </div>
      </section>

      {/* Apartments Listings - Alternating Layout */}
      <section className="py-12 md:py-20 overflow-x-hidden">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-6xl">
          {reorderedApartments.map((apartment, index) => {
            const isEven = index % 2 === 0
            const imageFromLeft = isEven
            const descriptionFromLeft = !isEven
            
            return (
              <motion.div
                key={apartment.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mb-16 md:mb-24 last:mb-0"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-full overflow-hidden ${
                  !isEven ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Image Section */}
                  <motion.div
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        x: imageFromLeft ? -100 : 100,
                        y: 20
                      },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        y: 0,
                        transition: {
                          duration: 0.8,
                          ease: "easeOut"
                        }
                      }
                    }}
                    className={`relative overflow-hidden rounded-tl-[80px] shadow-2xl max-w-[95%] md:max-w-[85%] mx-auto group ${!isEven ? 'lg:col-start-2' : ''}`}
                    style={{ marginTop: index === 0 ? '2rem' : '1rem' }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-tl-[80px]">
                      <img
                        src={apartment.image}
                        alt={apartment.name}
                        className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Promo Sales Banner - Pure red */}
                      {apartment.originalPrice && (
                        <motion.div
                          initial={{ scale: 0, rotate: -12 }}
                          animate={{ scale: 1, rotate: -3 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-2xl transform z-20"
                        >
                          <span className="text-xs font-bold uppercase tracking-wide">
                            {Math.round(((apartment.originalPrice - apartment.price) / apartment.originalPrice) * 100)}% OFF
                          </span>
                        </motion.div>
                      )}

                      <div className={`absolute ${apartment.originalPrice ? 'top-16' : 'top-4'} left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full`}>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-gray-900">{apartment.rating || 4.9}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-6 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-2xl">
                        <div className="flex flex-col items-end">
                          {apartment.originalPrice ? (
                            <>
                              <span className="text-xs line-through opacity-75">₦{apartment.originalPrice.toLocaleString()}/night</span>
                              <span className="text-sm font-bold drop-shadow-lg">₦{apartment.price.toLocaleString()}/night</span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-bold drop-shadow-lg">
                                ₦{apartment.price.toLocaleString()}/night
                              </span>
                            </>
                          )}
                          <span className="text-[10px] font-medium leading-tight text-white/85">
                            Including VAT and service charge
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description Section */}
                  <motion.div
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        x: descriptionFromLeft ? -100 : 100,
                        y: 20
                      },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        y: 0,
                        transition: {
                          duration: 0.8,
                          delay: 0.2,
                          ease: "easeOut"
                        }
                      }
                    }}
                    className={`space-y-6 max-w-[95%] md:max-w-[90%] mx-auto ${!isEven ? 'lg:col-start-1' : ''}`}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-words font-serif">
                        {apartment.name}
                      </h2>
                      <div className="relative mb-4">
                        <p className="font-serif text-2xl md:text-3xl font-bold italic text-gray-900">
                          ₦{apartment.price.toLocaleString()}/night
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          Including VAT and service charge
                        </p>
                      </div>
                      <div className="relative flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span className="text-lg">{apartment.location}</span>
                      </div>

                      <p className="relative text-base md:text-lg text-gray-700 leading-relaxed break-words">
                        {apartment.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100 shadow-md">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span><strong>{apartment.details.maxGuests}</strong> Guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Bed className="h-5 w-5 text-blue-600" />
                        <span>{apartment.details.bedSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Bath className="h-5 w-5 text-blue-600" />
                        <span>{apartment.details.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Wifi className="h-5 w-5 text-blue-600" />
                        <span>Free WiFi</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl border-2 border-blue-100 shadow-md">
                      <p className="text-base font-semibold text-blue-900 mb-3">Key Features:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {apartment.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button - Solid blue with white text */}
                    <div className="pt-4">
                      <Link to={`/apartments/${apartment.slug}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                          View Details & Book Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white overflow-x-hidden">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contact our team and we'll help you find the perfect apartment for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="text-lg px-8 h-14 bg-orange-600 hover:bg-orange-700 text-white">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:09112300062">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2 border-gray-300 text-gray-900 bg-white hover:bg-white hover:text-gray-900">
                  Call Now: 09112300062
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


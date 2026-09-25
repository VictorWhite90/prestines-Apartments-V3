import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apartments } from '@/data/apartments'
import { ArrowRight, MapPin, Users, Home, Bed, Bath, Wifi, ChevronLeft, ChevronRight } from 'lucide-react'
import { initAllTracking, trackFacebookPageView } from '@/utils/tracking'

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

            <a href={heroApartments[currentHeroSlide]?.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-brand-500/50 transition-all duration-300 hover:scale-105">
                Book Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
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

                      <div className="absolute top-4 right-6 bg-brand-600 text-white px-3 py-1.5 rounded-lg shadow-2xl">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold drop-shadow-lg">
                            ₦{apartment.price.toLocaleString()}/night
                          </span>
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
                    <div className="relative overflow-hidden rounded-xl bg-[#4A000C] p-5 border border-[#D9A632]/35 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
                        aria-hidden="true"
                      >
                        <defs>
                          <pattern
                            id={`apartment-description-fan-${apartment.id}`}
                            width="144"
                            height="96"
                            patternUnits="userSpaceOnUse"
                          >
                            <path d="M0 96 Q36 24 72 96 Q108 24 144 96" fill="none" stroke="#D9A632" strokeWidth="1.2" />
                            <path d="M0 96 Q72 -24 144 96" fill="none" stroke="#D9A632" strokeWidth="1.2" />
                            <path d="M36 96 Q72 48 108 96" fill="none" stroke="#D9A632" strokeWidth="1" />
                            <path d="M18 96 Q72 8 126 96" fill="none" stroke="#D9A632" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#apartment-description-fan-${apartment.id})`}
                        />
                      </svg>
                      <h2 className="relative text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2 break-words font-serif leading-tight">
                        {apartment.name}
                      </h2>
                      <div className="relative mb-3">
                        <p className="font-serif text-xl md:text-2xl font-medium italic text-[#D9A632]">
                          ₦{apartment.price.toLocaleString()}/night
                        </p>
                        <p className="font-sans text-xs font-normal text-white/70">
                          Including VAT and service charge
                        </p>
                      </div>
                      <div className="relative flex items-center gap-2 text-white/80 mb-3">
                        <MapPin className="h-4 w-4 text-[#D9A632]" />
                        <span className="font-sans text-sm">{apartment.location}</span>
                      </div>

                      <p
                        className="relative font-sans text-sm font-normal text-white/80 leading-6 break-words"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 5,
                          overflow: 'hidden',
                        }}
                      >
                        {apartment.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-brand-50 to-cyan-50 rounded-xl border-2 border-brand-100 shadow-md">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="h-5 w-5 text-brand-600" />
                        <span><strong>{apartment.details.maxGuests}</strong> Guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Bed className="h-5 w-5 text-brand-600" />
                        <span>{apartment.details.bedSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Bath className="h-5 w-5 text-brand-600" />
                        <span>{apartment.details.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Wifi className="h-5 w-5 text-brand-600" />
                        <span>Free WiFi</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-6 bg-gradient-to-br from-brand-50 via-white to-brand-50 rounded-xl border-2 border-brand-100 shadow-md">
                      <p className="text-base font-semibold text-brand-900 mb-3">Key Features:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {apartment.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 rounded-full bg-brand-600"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button - Solid blue with white text */}
                    <div className="pt-4">
                      <a href={apartment.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                          Book Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
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
                <Button size="lg" className="text-lg px-8 h-14 bg-gold-600 hover:bg-gold-700 text-white">
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

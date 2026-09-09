import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { apartments } from '@/data/apartments'
import { ArrowRight, Star, MapPin, Wifi, Car, Shield, Users, HomeIcon, UtensilsCrossed, Sparkles, Award, Clock, Phone, Mail, ChevronLeft, ChevronRight, Waves, Building2, Scissors, ChefHat, Trophy } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { initAllTracking, trackFacebookPageView } from '@/utils/tracking'
import LocateButton from '@/components/LocateButton'

export default function Home() {
  // Exclude Prestige-Suite-2-Bedroom-Apartment-Lugbe and show other 3 apartments
  const featuredApartments = apartments.filter(apt => apt.id !== 'prestige-suite').slice(0, 3)
  const exclusiveApartment = apartments.find(apt => apt.id === 'premium-apartment') || apartments[0]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showArrows, setShowArrows] = useState(false)
  const [isFeatureVideoReady, setIsFeatureVideoReady] = useState(false)
  const [activeApartmentCategory, setActiveApartmentCategory] = useState('All')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const apartmentCategories = ['All', 'Deluxe Royal', 'Premium Luxury', 'Studio']
  const apartmentCategoryById = {
    'premium-apartment': 'Deluxe Royal',
    'standard-apartment': 'Premium Luxury',
    'classic-studio': 'Studio',
  }
  const visibleFeaturedApartments = activeApartmentCategory === 'All'
    ? featuredApartments
    : featuredApartments.filter((apartment) => apartmentCategoryById[apartment.id] === activeApartmentCategory)

  const heroImages = [
    {
      image: '/images/bgAIgenerated9.jpeg',
      text: { position: 'left', main: 'Arrive in Style', sub: 'Stay at Ease', tagline: 'A gracious Abuja welcome from arrival to departure' }
    },
    {
      image: '/images/bgAIgenerated2.jpeg',
      text: { position: 'right', main: 'Space to Settle', sub: 'Room to Unwind', tagline: 'Thoughtfully furnished living for work, rest, and everything between' }
    },
    {
      image: '/new prestine images/nwpremuimpalour (2).jpg',
      text: { position: 'left', main: 'Refined Living', sub: 'Made Personal', tagline: 'A polished private residence with the ease of attentive hospitality' }
    },
    {
      image: '/new prestine images/kitten.jpg',
      text: { position: 'center', main: 'Cook. Gather.', sub: 'Feel at Home.', tagline: 'A modern kitchen prepared for everyday living and longer stays' }
    },
    {
      image: '/new prestine images/palour and dinning.jpg',
      text: { position: 'left', main: 'Dine in Comfort', sub: 'Stay for More', tagline: 'An inviting setting for quiet meals and shared moments' }
    },
    {
      image: '/new prestine images/premuim bathroom.png',
      text: { position: 'right', main: 'Refresh', sub: 'Restore', tagline: 'Clean contemporary details designed around your comfort' }
    },
    {
      image: '/new prestine images/premuimbedroomwithpillows.jpg',
      text: { position: 'center', main: 'Rest Beautifully', sub: 'Wake Refreshed', tagline: 'A calm private bedroom created for unhurried nights' }
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        return (prev + 1) % heroImages.length
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [currentSlide, heroImages.length])

  // Initialize tracking scripts
  useEffect(() => {
    initAllTracking()
    trackFacebookPageView()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      return (prev + 1) % heroImages.length
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      return (prev - 1 + heroImages.length) % heroImages.length
    })
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const getTextPosition = (position) => {
    switch (position) {
      case 'center':
        return 'items-center justify-center text-center px-8 md:px-16'
      case 'left':
        return 'items-start justify-start text-left px-12 md:px-20 lg:px-24'
      case 'right':
        return 'items-end justify-end text-right px-8 md:px-16'
      default:
        return 'items-center justify-center text-center px-8 md:px-16'
    }
  }

  const testimonials = [
    {
      name: "Chioma Okonkwo",
      location: "Lagos, Nigeria",
      rating: 5,
      text: "Exceptional service and beautiful apartments. The location is perfect and the staff went above and beyond to ensure our comfort.",
      image: "/new prestine images/nwpremuimpalour (2).jpg"
    },
    {
      name: "Adebayo Adeyemi",
      location: "Abuja, Nigeria",
      rating: 5,
      text: "Modern amenities and impeccable cleanliness. Highly recommend for both business and leisure travelers.",
      image: "/new prestine images/premuimbedroomwithpillows.jpg"
    },
    {
      name: "Amina Ibrahim",
      location: "Kano, Nigeria",
      rating: 5,
      text: "The apartment exceeded our expectations. Spacious, well-equipped, and in a prime location. Will definitely return!",
      image: "/images/living room lugbe.webp"
    }
  ]

  const amenities = [
    { icon: Wifi, title: "High-Speed WiFi", description: "Free high-speed internet access" },
    { icon: Car, title: "Parking Available", description: "Secure parking facilities" },
    { icon: Shield, title: "24/7 Security", description: "Round-the-clock security service" },
    { icon: Users, title: "Concierge Service", description: "Dedicated concierge support" },
    { icon: HomeIcon, title: "Fully Furnished", description: "Modern furniture and appliances" },
    { icon: UtensilsCrossed, title: "Fully Equipped Kitchen", description: "Complete kitchen facilities" },
    { icon: Trophy, title: "Recreation Facilities", description: "Lawn tennis, snooker board" },
    { icon: Waves, title: "Swimming Pool", description: "Refreshing pool facilities" },
    { icon: Building2, title: "Conference & Training", description: "Professional meeting facilities" },
    { icon: UtensilsCrossed, title: "Restaurants", description: "On-site dining options" },
    { icon: Scissors, title: "Beauty Saloons", description: "Professional beauty services" },
    { icon: ChefHat, title: "Indoor/Outdoor Catering", description: "Full catering services available" },
  ]

  const whyChooseUs = [
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Strategically located near major attractions, airports, and business districts"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Luxury apartments with top-tier amenities and modern design"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you anytime"
    },
    {
      icon: Sparkles,
      title: "Flexible Stays",
      description: "Short-term and long-term rental options to suit your needs"
    }
  ]

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full w-full">
      {/* Hero Section with Video Intro and Image Slider */}
      <section
        className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden rounded-tl-[40px]"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-brand-800/20 animate-gradient-shift bg-200% z-[1] pointer-events-none"></div>

        {heroImages.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 rounded-tl-[40px] transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-tl-[40px]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>
        ))}

        {/* Text Overlay */}
        <motion.div
          key={`hero-text-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 flex ${getTextPosition(heroImages[currentSlide].text.position)}`}
        >
          <div className="text-white z-10 max-w-4xl px-4 pb-20 md:pb-32 pt-24 md:pt-32 lg:pt-40">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-1 tracking-tight drop-shadow-2xl"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(37,99,235,0.3)'
              }}
            >
              {heroImages[currentSlide].text.main}
            </h1>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-3 md:mb-4 tracking-tight drop-shadow-2xl"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(37,99,235,0.3)'
              }}
            >
              {heroImages[currentSlide].text.sub}
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-white/90 font-light max-w-2xl mt-2 md:mt-4 drop-shadow-lg mb-5 md:mb-8">
              {heroImages[currentSlide].text.tagline}
            </p>
            <Link to="/apartments">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-base font-semibold shadow-2xl hover:shadow-brand-500/50 transition-all duration-300 hover:scale-105 w-auto">
                Explore Apartments
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Navigation Arrows - Show on Hover (Desktop Only) */}
        <div className="hidden md:block">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showArrows ? 1 : 0, x: showArrows ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showArrows ? 1 : 0, x: showArrows ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Exclusive Environment Section */}
      <section ref={sectionRef} className="bg-[#f7f5f0] py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-5 md:space-y-6"
            >
              <h3 className="text-xs sm:text-sm font-semibold text-gold-700 uppercase tracking-[0.22em]">
                SIGNATURE RESIDENCE <span className="text-gray-500">· DELUXE ROYAL</span>
              </h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-950 leading-tight">
                Exclusive comfort, quietly elevated
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                For guests who prefer privacy, calm, and a more considered stay, our Deluxe Royal
                apartment brings polished interiors, attentive support, and the ease of a refined Apo address.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                It is designed for business leaders, couples, and long-stay guests who want hotel-grade
                convenience without giving up the comfort and discretion of a private residence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: 'Private Apo setting', value: 'Apo' },
                  { label: 'Deluxe Royal nightly stay', value: `NGN ${exclusiveApartment.price.toLocaleString()}` },
                  { label: 'Guest rating', value: `${exclusiveApartment.rating || 4.9}/5` },
                ].map((item) => (
                  <div key={item.label} className="border-y border-gray-300/70 py-4">
                    <div className="text-lg md:text-xl font-semibold text-gray-950">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2">
                <Link to={`/apartments/${exclusiveApartment.slug}`} className="min-w-0 flex-1 sm:flex-none">
                  <Button className="bg-[#4A000C] hover:bg-[#650014] text-white px-3 sm:px-6 md:px-8 w-full text-xs sm:text-sm md:text-base whitespace-nowrap">
                    View Deluxe Royal
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
                <Link to="/apartments" className="min-w-0 flex-1 sm:flex-none">
                  <Button variant="outline" className="border-gray-950 text-gray-950 hover:bg-white px-3 sm:px-6 md:px-8 w-full text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Browse Collection
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gray-950">
                <img
                  src={exclusiveApartment.image}
                  alt={exclusiveApartment.name}
                  className="h-[420px] md:h-[520px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Feature Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative h-[62vh] md:h-[72vh] w-full">
          <img
            src="/new prestine images/nwpremuimpalour (2).jpg"
            alt="Prestine Apartments premium living room"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isFeatureVideoReady ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            decoding="async"
          />

          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/new prestine images/nwpremuimpalour (2).jpg"
            onLoadedData={() => setIsFeatureVideoReady(true)}
            onCanPlay={() => setIsFeatureVideoReady(true)}
          >
            <source src={encodeURI('/prestine compressed video.mp4')} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/18 via-black/6 to-black/16" />

          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
                style={{
                  textShadow: '0 3px 10px rgba(0,0,0,0.25), 0 6px 18px rgba(0,0,0,0.12)'
                }}
              >
                Plan Your
                <br />
                Ultimate Escape
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mx-auto mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-white/90"
              >
                Take a quick look inside the spaces and see how every apartment is designed to feel calm, polished, and memorable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8"
              >
                <Link to="/apartments">
                  <Button className="h-12 rounded-none bg-white px-8 text-sm font-medium text-gray-900 hover:bg-gray-100 md:h-14 md:px-10 md:text-base">
                    Check Availability
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Listings Section */}
      <section className="relative overflow-hidden bg-[#4A000C] py-16 text-white md:py-24">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="prestine-gold-fan-pattern"
              width="144"
              height="96"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 96 Q36 24 72 96 Q108 24 144 96"
                fill="none"
                stroke="#D9A632"
                strokeWidth="1.2"
              />
              <path
                d="M0 96 Q72 -24 144 96"
                fill="none"
                stroke="#D9A632"
                strokeWidth="1.2"
              />
              <path
                d="M36 96 Q72 48 108 96"
                fill="none"
                stroke="#D9A632"
                strokeWidth="1"
              />
              <path
                d="M18 96 Q72 8 126 96"
                fill="none"
                stroke="#D9A632"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prestine-gold-fan-pattern)" />
        </svg>
        <div className="container relative z-10 mx-auto px-5 md:px-10 lg:px-16">
          <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
                Stay your way
              </p>
              <h2 className="font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
                Beautiful apartments & spaces
              </h2>
            </motion.div>
            <p className="max-w-2xl text-sm leading-7 text-white/70 md:text-base lg:justify-self-end lg:text-right">
              Explore thoughtfully furnished homes in Abuja, designed for quiet weekends, productive
              business trips, family stays, and everything in between.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-x-7 gap-y-3 border-b border-white/15">
            {apartmentCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveApartmentCategory(category)}
                className={`relative pb-3 text-sm transition-colors md:text-base ${
                  activeApartmentCategory === category
                    ? 'text-gold-300'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {category}
                {activeApartmentCategory === category && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-400" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
            {visibleFeaturedApartments.map((apartment, index) => {
              const tier = apartmentCategoryById[apartment.id] || 'Residence'
              return (
                <motion.article
                  key={apartment.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="relative">
                    <Link
                      to={`/apartments/${apartment.slug}`}
                      className="relative block h-64 overflow-hidden bg-brand-950 sm:h-72 lg:h-80"
                    >
                      <img
                        src={apartment.image}
                        alt={apartment.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                        <span className="bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4A000C]">
                          {tier}
                        </span>
                        {apartment.originalPrice && (
                          <span className="bg-gold-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-950">
                            Save {Math.round(((apartment.originalPrice - apartment.price) / apartment.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-900 transition-transform group-hover:translate-x-1 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11">
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </div>

                  <div className="pt-6">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300">
                      Refined comfort in {apartment.location}
                    </p>
                    <Link to={`/apartments/${apartment.slug}`}>
                      <h3 className="font-serif text-2xl font-light text-white transition-colors group-hover:text-gold-300 md:text-3xl">
                        {apartment.name}
                      </h3>
                    </Link>
                    <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-6 text-white/65">
                      {apartment.description}
                    </p>
                    <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
                      <span>{apartment.details.maxGuests} guests · {apartment.details.bedSize}</span>
                      <span className="font-serif text-lg text-white">
                        From ₦{apartment.price.toLocaleString()}{' '}
                        <span className="font-sans text-xs text-white/50">per night · VAT & service included</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-14 text-center">
            <Link to="/apartments">
              <Button className="h-12 rounded-none bg-white px-9 text-[#4A000C] hover:bg-white/90">
                Explore All Apartments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-3 md:mb-4 relative inline-block">
              <span className="relative z-10 text-gray-900">
                Why Choose <span className="text-[#4A000C]">Prestine Apartments?</span>
              </span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-600 to-transparent" />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 animate-fade-in">
              We combine luxury, comfort, and convenience to create an exceptional living experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-full pt-4 pb-4">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group relative w-full"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-brand-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>

                <Card className="relative h-full border border-brand-100 bg-white overflow-hidden w-full shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold-300 hover:shadow-xl">
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.25 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#4A000C] flex items-center justify-center transition-all duration-300 shadow-md"
                    >
                      <item.icon className="h-7 w-7 text-gold-300 sm:h-8 sm:w-8" />
                    </motion.div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors duration-300 break-words">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-6">
                    <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed break-words">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-3 md:mb-4">
              Premium Amenities
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need for a comfortable and convenient stay
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Card className="h-full rounded-2xl border border-gold-100 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl">
                  <CardHeader>
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
                      ['Parking Available', '24/7 Security', 'Concierge Service', 'Conference & Training'].includes(amenity.title)
                        ? 'bg-[#4A000C]'
                        : 'bg-gold-100'
                    }`}>
                      <amenity.icon className={`h-7 w-7 ${
                        ['Parking Available', '24/7 Security', 'Concierge Service', 'Conference & Training'].includes(amenity.title)
                          ? 'text-gold-300'
                          : 'text-gold-700'
                      }`} />
                    </div>
                    <CardTitle className="text-base md:text-lg">{amenity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{amenity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-3 md:mb-4">
              What Our Guests Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Don't just take our word for it - hear from our satisfied guests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-50 border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </CardHeader>
                  <CardFooter className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 md:mb-6">
              Ready to Experience Luxury Living?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 px-4">
              Book your stay today and discover why Prestine Apartments is the preferred choice 
              for travelers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4">
              <Link to="/apartments" className="w-full sm:w-auto">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 bg-gold-600 hover:bg-gold-700 text-white w-full sm:w-auto">
                  Browse Apartments
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <a href="tel:09112300062" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 border-2 border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Call Us Now
                </Button>
              </a>
              <a href="mailto:Support@prestineapartment.com" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 border-2 border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Send Email
                </Button>
              </a>
              <LocateButton className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg !border-2 !border-gold-600 !bg-white !text-gold-600 hover:!bg-gold-600 hover:!text-white" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

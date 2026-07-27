import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { apartments } from '@/data/apartments'
import { ArrowRight, Star, MapPin, Wifi, Car, Shield, Users, HomeIcon, UtensilsCrossed, Sparkles, Award, Clock, Phone, Mail, ChevronLeft, ChevronRight, Waves, Building2, Scissors, ChefHat, Trophy } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { initAllTracking, trackFacebookPageView, trackGooglePageView } from '@/utils/tracking'
import LocateButton from '@/components/LocateButton'

export default function Home() {
  // Exclude Prestige-Suite-2-Bedroom-Apartment-Lugbe and show other 3 apartments
  const featuredApartments = apartments.filter(apt => apt.id !== 'prestige-suite').slice(0, 3)
  const exclusiveApartment = apartments.find(apt => apt.id === 'premium-apartment') || apartments[0]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showArrows, setShowArrows] = useState(false)
  const [isFeatureVideoReady, setIsFeatureVideoReady] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const heroImages = [
    {
      image: '/images/bgAIgenerated9.jpeg',
      text: { position: 'left', main: 'Warm', sub: 'Hospitality', tagline: 'A gracious welcome from arrival to checkout' }
    },
    {
      image: '/images/bgAIgenerated2.jpeg',
      text: { position: 'right', main: 'Refined', sub: 'Lounge', tagline: 'Settle into a calm space designed for easy evenings' }
    },
    {
      image: '/new prestine images/nwpremuimpalour (2).jpg',
      text: { position: 'left', main: 'Polished', sub: 'Parlour', tagline: 'A welcoming living room made for quiet comfort and conversation' }
    },
    {
      image: '/new prestine images/kitten.jpg',
      text: { position: 'center', main: 'Modern', sub: 'Kitchen', tagline: 'A clean, functional cooking space with a premium finish' }
    },
    {
      image: '/new prestine images/palour and dinning.jpg',
      text: { position: 'left', main: 'Elegant', sub: 'Dining', tagline: 'Thoughtfully styled spaces made for easy living' }
    },
    {
      image: '/new prestine images/premuim bathroom.png',
      text: { position: 'right', main: 'Refined', sub: 'Bathroom', tagline: 'Every detail crafted for your ultimate comfort' }
    },
    {
      image: '/new prestine images/premuimbedroomwithpillows.jpg',
      text: { position: 'center', main: 'Bright', sub: 'Bedrooms', tagline: 'Warm, restful rooms for a calm stay' }
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
    trackGooglePageView('/')
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-800/20 animate-gradient-shift bg-200% z-[1] pointer-events-none"></div>

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
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-light mb-2 tracking-tight drop-shadow-2xl"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(37,99,235,0.3)'
              }}
            >
              {heroImages[currentSlide].text.main}
            </h1>
            <h2
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-light mb-3 tracking-tight drop-shadow-2xl"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(37,99,235,0.3)'
              }}
            >
              {heroImages[currentSlide].text.sub}
            </h2>
            <p className="text-xs sm:text-xs md:text-sm text-white/90 font-light max-w-xl mt-3 md:mt-4 drop-shadow-lg mb-6 md:mb-8">
              {heroImages[currentSlide].text.tagline}
            </p>
            <Link to="/apartments">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-base font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 w-auto">
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
              <h3 className="text-xs sm:text-sm font-semibold text-orange-700 uppercase tracking-[0.22em]">
                SIGNATURE RESIDENCE
              </h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-950 leading-tight">
                Exclusive comfort, quietly elevated
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                For guests who prefer privacy, calm, and a more considered stay, our Premium Royale
                apartment brings polished interiors, attentive support, and the ease of a refined Apo address.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                It is designed for business leaders, couples, and long-stay guests who want hotel-grade
                convenience without giving up the comfort and discretion of a private residence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: 'Private Apo setting', value: 'Apo' },
                  { label: 'Premium nightly stay', value: `NGN ${exclusiveApartment.price.toLocaleString()}` },
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
                  <Button className="bg-gray-950 hover:bg-gray-800 text-white px-3 sm:px-6 md:px-8 w-full text-xs sm:text-sm md:text-base whitespace-nowrap">
                    View Premium Apartment
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
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-3 md:mb-4 relative inline-block">
              <span className="relative z-10">Featured Apartments</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-full"
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 animate-fade-in">
              Explore our premium collection of carefully curated apartments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {featuredApartments.map((apartment, index) => {
              return (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="relative group"
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                >
                  {/* Subtle edge highlight on hover */}
                  <div className="absolute -inset-0.5 bg-blue-600/25 rounded-tl-[80px] opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  <div
                    className="relative overflow-hidden rounded-tl-[80px] shadow-lg group h-96 md:h-[500px] cursor-pointer bg-white"
                  >
                    <img
                      src={apartment.image}
                      alt={apartment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Promo Sales Banner - Pure red */}
                    {apartment.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-2xl transform z-20">
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {Math.round(((apartment.originalPrice - apartment.price) / apartment.originalPrice) * 100)} OFF
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 z-30 px-3 py-2 text-right text-white drop-shadow">
                      <div className="font-serif text-sm italic leading-tight md:text-base">
                        ₦{apartment.price.toLocaleString()}/night
                      </div>
                      <div className="mt-0.5 text-[9px] font-medium leading-tight text-white/75">
                        VAT included
                      </div>
                    </div>

                    <Link
                      to={`/apartments/${apartment.slug}`}
                      className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-16 text-white"
                    >
                      <div className="max-w-[72%] -translate-y-4 transition-transform duration-300 group-hover:-translate-y-7">
                        <h3 className="text-sm md:text-base font-semibold leading-tight drop-shadow">
                          {apartment.name}
                        </h3>
                        <p className="mt-1 text-[11px] md:text-xs text-white/85">
                          View details
                        </p>
                        <div className="mt-3 hidden w-fit translate-x-5 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-gray-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:inline-flex">
                          Open
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/apartments">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all">
                View All Apartments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-3 md:mb-4 relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900">
                Why Choose Prestine Apartments?
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent origin-center"
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 animate-fade-in">
              We combine luxury, comfort, and convenience to create an exceptional living experience
            </p>
          </motion.div>

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
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>

                <Card className="relative h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white overflow-hidden w-full">
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-600'} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <item.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${index % 2 === 0 ? 'text-blue-600' : 'text-white'}`} />
                    </motion.div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 break-words">{item.title}</CardTitle>
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
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-md h-full">
                  <CardHeader>
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-full ${index % 2 === 0 ? 'bg-orange-100' : 'bg-gray-900'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <amenity.icon className={`h-7 w-7 ${index % 2 === 0 ? 'text-orange-600' : 'text-white'}`} />
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
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
                  Browse Apartments
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <a href="tel:09112300062" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Call Us Now
                </Button>
              </a>
              <a href="mailto:Support@prestineapartment.com" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Send Email
                </Button>
              </a>
              <LocateButton className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-white text-gray-950 hover:bg-gray-100" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

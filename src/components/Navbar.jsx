import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apartments', label: 'Apartments' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin/login', label: 'Admin' },
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 overflow-x-hidden max-w-full w-full ${
        scrolled 
          ? 'bg-[#4A000C]/95 backdrop-blur-md shadow-lg'
          : 'bg-[#4A000C]'
      }`}>
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/new prestine images/logonew.png"
                alt="Prestine Apartments" 
                className="h-16 md:h-20 w-auto max-w-[160px] md:max-w-[200px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-gold-300'
                        : 'text-white hover:text-gold-300'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-300"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>


            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-white to-gray-50 z-50 lg:hidden shadow-2xl flex flex-col"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b-2 border-brand-600 bg-brand-600 flex-shrink-0">
                  <img
                    src="/new prestine images/logonew.png"
                    alt="Prestine Apartments"
                    className="h-14 w-auto max-w-[170px] object-contain"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white" style={{ overscrollBehavior: 'contain' }}>
                  <ul className="space-y-2">
                    {navLinks.map((link, idx) => (
                      <motion.li
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          to={link.path}
                          className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                            location.pathname === link.path
                              ? 'bg-brand-600 text-white font-semibold shadow-lg'
                              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-600'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 pt-8 border-t-2 border-brand-200"
                  >
                    <Link
                      to="/apartments"
                      className="block w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white text-center rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Book Now
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 space-y-3"
                  >
                    <a
                      href="tel:09112300062"
                      className="flex items-center gap-3 px-4 py-3 bg-brand-50 hover:bg-brand-100 rounded-lg text-gray-700 transition-colors border border-brand-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Phone className="h-5 w-5 text-brand-600" />
                      <span className="font-medium">09112300062</span>
                    </a>
                    <a
                      href="mailto:Support@prestineapartment.com"
                      className="flex items-center gap-3 px-4 py-3 bg-brand-50 hover:bg-brand-100 rounded-lg text-gray-700 transition-colors border border-brand-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Mail className="h-5 w-5 text-brand-600" />
                      <span className="text-sm font-medium">Support@prestineapartment.com</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

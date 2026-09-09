// Tracking utilities for Facebook Pixel, Google Analytics, and Microsoft Clarity

// Enable debug mode in development (set to false in production)
const DEBUG_TRACKING = import.meta.env.DEV || import.meta.env.MODE === 'development'

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return

  // Check if already initialized
  if (window.fbq) {
    if (DEBUG_TRACKING) console.log('✅ Facebook Pixel already initialized')
    return
  }

  !function(f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', '3570049643299661')
  window.fbq('track', 'PageView')
  
  if (DEBUG_TRACKING) {
    console.log('✅ Facebook Pixel initialized and PageView tracked')
    console.log('📊 Facebook Pixel ID: 3570049643299661')
  }
}

// Track Facebook Pixel PageView
export const trackFacebookPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
    if (DEBUG_TRACKING) console.log('📊 Facebook Pixel: PageView tracked')
  } else if (DEBUG_TRACKING) {
    console.warn('⚠️ Facebook Pixel not initialized yet')
  }
}

// Track Facebook Pixel Lead
export const trackFacebookLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
    if (DEBUG_TRACKING) console.log('🎯 Facebook Pixel: Lead event tracked')
  } else if (DEBUG_TRACKING) {
    console.warn('⚠️ Facebook Pixel not initialized - Lead event not tracked')
  }
}

// Initialize Google Ads (Clarity and GA4 pageviews now run through Google Tag Manager, GTM-58RRD5NZ)
export const initGoogleAds = () => {
  if (typeof window === 'undefined') return

  // Check if already initialized
  if (window.__adsTagLoaded) {
    if (DEBUG_TRACKING) console.log('✅ Google Ads already initialized')
    return
  }
  window.__adsTagLoaded = true

  // Load Google tag (gtag.js) for Ads
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16944698468'
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'AW-16944698468')

  if (DEBUG_TRACKING) {
    console.log('✅ Google Ads initialized')
    console.log('📊 Google Ads ID: AW-16944698468')
  }
}

// Track Google Ads Conversion
export const trackGoogleAdsConversion = (conversionId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `AW-16944698468/${conversionId}`
    })
    if (DEBUG_TRACKING) console.log(`🎯 Google Ads: Conversion tracked - ${conversionId}`)
  } else if (DEBUG_TRACKING) {
    console.warn('⚠️ Google Ads not initialized yet')
  }
}

// Initialize all tracking scripts
export const initAllTracking = () => {
  if (DEBUG_TRACKING) {
    console.log('🚀 Initializing all tracking scripts...')
    console.log('📍 Current URL:', window.location.href)
  }
  
  initFacebookPixel()
  initGoogleAds()

  if (DEBUG_TRACKING) {
    console.log('✅ All tracking scripts initialized')
    console.log('💡 Tip: Check Network tab in DevTools to verify tracking requests')
  }
}

// Verify tracking is working (useful for testing)
export const verifyTracking = () => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ Cannot verify tracking: window is undefined')
    return
  }

  const status = {
    facebookPixel: !!window.fbq,
    tagManager: !!window.google_tag_manager,
    googleAds: !!(window.gtag && window.dataLayer)
  }

  console.log('📊 Tracking Status:', status)

  if (status.facebookPixel && status.tagManager && status.googleAds) {
    console.log('✅ All tracking scripts are loaded and ready!')
    console.log('📊 Includes: Facebook Pixel, Google Tag Manager (Clarity + GA4) & Google Ads')
  } else {
    console.warn('⚠️ Some tracking scripts may not be loaded:', status)
  }

  return status
}


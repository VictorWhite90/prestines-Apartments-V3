import { BotMessageSquare, MapPin } from 'lucide-react'
import { prestineLocation } from '@/config/location'

export default function LocateButton({ variant = 'inline', className = '' }) {
  const isFloating = variant === 'floating'

  return (
    <a
      href={prestineLocation.mapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get directions to Prestine Apartments"
      className={
        isFloating
          ? `fixed right-0 bottom-28 z-50 flex items-center rounded-l-full bg-gray-950 text-white ${className}`
          : `inline-flex items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 ${className}`
      }
    >
      {isFloating ? (
        <>
          <span className="animate-locate-label-slide overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em]">
            Locate Us
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-l-full">
            <BotMessageSquare className="h-5 w-5" />
          </span>
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4" />
          <span>Get Directions</span>
        </>
      )}
    </a>
  )
}

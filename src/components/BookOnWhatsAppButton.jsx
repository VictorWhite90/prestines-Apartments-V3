import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { bookOnWhatsAppUrl } from '@/config/whatsapp'
import { trackFacebookLead } from '@/utils/tracking'

export default function BookOnWhatsAppButton({ apartment, className, linkClassName }) {
  return (
    <a
      href={bookOnWhatsAppUrl(apartment)}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
      onClick={trackFacebookLead}
    >
      <Button className={cn('bg-[#25D366] hover:bg-[#1ebe5a] text-white', className)}>
        <MessageCircle className="mr-2 h-5 w-5" />
        Book on WhatsApp
      </Button>
    </a>
  )
}

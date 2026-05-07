import { Youtube, Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-8">
          <a
            href="https://open.spotify.com/artist/75OA0LaPCDn7otrA0j6cuJ"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-110"
            style={{ color: 'var(--soft-brown)' }}
            aria-label="Spotify"
          >
            <Music size={20} />
          </a>
          <a
            href="https://youtube.com/channel/UCHvDS8SXHZECDOLIAc0TtIw?si=OKaBhEayrtAknuLH"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-110"
            style={{ color: 'var(--soft-brown)' }}
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>
        </div>

        <p
          className="font-body text-xs tracking-wider"
          style={{ color: 'var(--soft-brown)' }}
        >
          © 2025 Ella Du. Made with care.
        </p>
      </div>
    </footer>
  )
}

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { useSongs, useConcertPhotos, useBehindTheScenes, useThoughts } from '@/hooks/useSanity'
import ScrollReveal from '../components/ScrollReveal'

function FloatingNotes() {
  const notes = [
    { src: '/images/deco-note1.png', left: '5%', delay: '0s', duration: '8s', size: '24px' },
    { src: '/images/deco-note2.png', left: '15%', delay: '2s', duration: '10s', size: '20px' },
    { src: '/images/deco-note1.png', left: '25%', delay: '4s', duration: '9s', size: '28px' },
    { src: '/images/deco-note2.png', left: '70%', delay: '1s', duration: '11s', size: '22px' },
    { src: '/images/deco-note1.png', left: '80%', delay: '3s', duration: '8s', size: '26px' },
    { src: '/images/deco-note2.png', left: '90%', delay: '5s', duration: '10s', size: '18px' },
    { src: '/images/deco-note1.png', left: '45%', delay: '6s', duration: '12s', size: '20px' },
    { src: '/images/deco-note2.png', left: '55%', delay: '2.5s', duration: '9s', size: '24px' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {notes.map((note, i) => (
        <img
          key={i}
          src={note.src}
          alt=""
          className="floating-note absolute"
          style={{
            left: note.left,
            bottom: '-40px',
            width: note.size,
            animationDelay: note.delay,
            animationDuration: note.duration,
            opacity: 0.15,
            filter: 'drop-shadow(0 1px 2px rgba(61,46,36,0.1))',
          }}
        />
      ))}
    </div>
  )
}

function MusicHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const pills = [
    { label: 'Songs', id: 'songs' },
    { label: 'Concerts', id: 'concerts' },
    { label: 'Behind the Scenes', id: 'behind-scenes' },
    { label: 'Thoughts', id: 'thoughts' },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img src="/images/music-hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(247,243,238,0.75)' }} />
      </div>

      <div className="text-center max-w-3xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl"
          style={{ color: 'var(--ink-brown)' }}
        >
          Music
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, rotate: -1, y: 10 }}
          animate={isInView ? { opacity: 1, rotate: 0, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-handwritten text-xl md:text-2xl mt-4"
          style={{ color: 'var(--soft-brown)', transform: 'rotate(-0.5deg)' }}
        >
          songs I've written, shows I've played, thoughts I've kept
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {pills.map((pill, i) => (
            <motion.button
              key={pill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              onClick={() => scrollTo(pill.id)}
              className="font-body text-sm px-5 py-2 rounded-full border transition-all duration-200 hover:bg-opacity-20"
              style={{
                borderColor: 'rgba(61,46,36,0.15)',
                color: 'var(--ink-brown)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(192,122,95,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {pill.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function VinylRecord({ cover, title, meta, desc, color, audioUrl }: { cover: string; title: string; meta: string; desc: string; color: string; audioUrl?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false))
        audioRef.current = null
      }
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (!audioRef.current) {
      setIsPlaying(!isPlaying)
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  // Build radial-gradient where the vinyl color is visible beyond the cover image
  const coverSizePercent = 48 // cover image occupies ~48% of vinyl radius
  const colorInner = `${color}dd`
  const colorMid = `${color}66`


  return (
    <div className="flex flex-col items-center">
      <div className="relative group cursor-pointer" onClick={togglePlay}>
        {/* Vinyl record body */}
        <div
          className="w-64 h-64 md:w-72 md:h-72 rounded-full relative overflow-hidden"
          style={{
            background: `radial-gradient(circle, 
              ${colorInner} 0%, ${colorInner} ${coverSizePercent - 8}%, 
              ${colorMid} ${coverSizePercent - 4}%, ${colorMid} ${coverSizePercent}%, 
              #1a1a1a ${coverSizePercent + 2}%, #2d2d2d ${coverSizePercent + 6}%, 
              #1a1a1a ${coverSizePercent + 10}%, #2d2d2d ${coverSizePercent + 14}%, 
              #1a1a1a ${coverSizePercent + 18}%, #2d2d2d ${coverSizePercent + 22}%, 
              #1a1a1a ${coverSizePercent + 26}%, #0d0d0d 100%)`,
            boxShadow: `0 0 0 3px ${colorMid}, 0 8px 32px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Rotating cover image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
          >
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-inner"
              style={{ border: `3px solid ${color}`, boxShadow: `0 0 12px ${color}55` }}
            >
              <img src={cover} alt={title} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Spindle hole */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-neutral-900" />
          </div>

          {/* Hover play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-full">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              {isPlaying
                ? <Pause size={20} fill="white" color="white" />
                : <Play size={20} fill="white" color="white" className="ml-0.5" />}
            </div>
          </div>
        </div>

        {/* Tone arm */}
        <div className="absolute -top-4 -right-4 w-20 h-24 pointer-events-none">
          <motion.div
            className="w-1 h-20 rounded-full origin-top-right"
            style={{ backgroundColor: 'var(--soft-brown)' }}
            animate={isPlaying ? { rotate: 15 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Track info */}
      <div className="mt-6 text-center">
        <h3 className="font-display text-xl md:text-2xl" style={{ color: 'var(--ink-brown)' }}>
          {title}
        </h3>
        <p className="font-body text-xs tracking-wider uppercase mt-1" style={{ color: 'var(--soft-brown)' }}>
          {meta}
        </p>
        <p className="font-body text-sm mt-2 max-w-xs" style={{ color: 'var(--soft-brown)', lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

function MySongs() {
  const { data: songs } = useSongs()

  return (
    <section id="songs" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            My Songs
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            originals & covers
          </p>
        </ScrollReveal>

        {(!songs || songs.length === 0) && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--cream)' }}>
            <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>
              No songs yet. Go to Sanity Studio, add songs, and click <strong>Publish</strong>.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-12">
          {songs?.map((song: any, i: number) => (
            <ScrollReveal key={song.id} delay={i * 0.15}>
              <VinylRecord
                cover={song.coverImage}
                title={song.title}
                meta={`${song.year} \u00b7 ${song.genre}`}
                desc={song.description || ""}
                color={song.color || '#8B7355'}
                audioUrl={song.audioUrl}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MyConcerts() {
  const { data: photos } = useConcertPhotos()

  return (
    <section id="concerts" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            My Concerts
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            moments on the stage
          </p>
        </ScrollReveal>

        {(!photos || photos.length === 0) && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--paper)' }}>
            <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>
              No concert photos yet. Add them in Sanity Studio and click <strong>Publish</strong>.
            </p>
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos?.map((photo: any, i: number) => (
            <ScrollReveal key={photo.id} delay={i * 0.1}>
              <div className="break-inside-avoid group relative overflow-hidden rounded-lg">
                <img
                  src={photo.imageUrl}
                  alt={`Concert moment ${i + 1}`}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BehindTheScenes() {
  const { data: items } = useBehindTheScenes()

  return (
    <section id="behind-scenes" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Behind the Scenes
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            how the songs are made
          </p>
        </ScrollReveal>

        {(!items || items.length === 0) && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--cream)' }}>
            <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>
              No behind-the-scenes content yet. Add them in Sanity Studio and click <strong>Publish</strong>.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-16">
          {items?.map((item: any, i: number) => (
            <ScrollReveal key={item.id} delay={0.1}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <div
                    className="aspect-[4/3] overflow-hidden rounded-lg"
                    style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`, boxShadow: '2px 4px 12px rgba(61,46,36,0.08)' }}
                  >
                    <img src={item.image1} alt={`${item.title} 1`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div
                    className="aspect-square overflow-hidden rounded-lg"
                    style={{ transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`, boxShadow: '2px 4px 12px rgba(61,46,36,0.08)' }}
                  >
                    <img src={item.image2} alt={`${item.title} 2`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>

                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: 'var(--ink-brown)' }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed" style={{ color: 'var(--soft-brown)', lineHeight: 1.8 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Thoughts() {
  const { data: thoughts } = useThoughts()

  return (
    <section id="thoughts" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Thoughts
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            writing about music & making
          </p>
        </ScrollReveal>

        {(!thoughts || thoughts.length === 0) && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--paper)' }}>
            <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>
              No thoughts yet. Add them in Sanity Studio and click <strong>Publish</strong>.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {thoughts?.map((thought: any, i: number) => (
            <ScrollReveal key={thought.id} delay={i * 0.15} direction="left">
              <div className="scrapbook-card flex gap-5 p-5 group cursor-pointer overflow-hidden">
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={thought.thumbnail}
                    alt={thought.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-terracotta transition-colors" style={{ color: 'var(--ink-brown)' }}>
                    {thought.title}
                  </h3>
                  <p className="font-body text-sm mb-2 line-clamp-2" style={{ color: 'var(--soft-brown)', lineHeight: 1.6 }}>
                    {thought.excerpt}
                  </p>
                  <p className="font-body text-xs tracking-wider" style={{ color: 'var(--soft-brown)' }}>
                    {thought.dateMonth} {thought.dateYear}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Music() {
  return (
    <div className="relative">
      <FloatingNotes />
      <div className="relative z-10">
        <MusicHero />
        <MySongs />
        <MyConcerts />
        <BehindTheScenes />
        <Thoughts />
      </div>
    </div>
  )
}

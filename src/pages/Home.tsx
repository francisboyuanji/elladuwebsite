import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Link } from 'react-router'
import { useChapters, useQuote } from '@/hooks/useSanity'
import ScrollReveal from '../components/ScrollReveal'

const decorations = [
  { src: '/images/deco-stars.png', style: { top: '10%', left: '6%', width: '56px', animationDelay: '0s' } },
  { src: '/images/deco-note1.png', style: { top: '18%', right: '8%', width: '48px', animationDelay: '1.5s' } },
  { src: '/images/deco-icecream.png', style: { bottom: '30%', left: '8%', width: '52px', animationDelay: '2.5s' } },
  { src: '/images/deco-note2.png', style: { top: '40%', right: '6%', width: '44px', animationDelay: '0.8s' } },
]

function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {decorations.map((d, i) => (
        <motion.img
          key={i}
          src={d.src}
          alt=""
          className="absolute opacity-15 decoration-drift"
          style={{
            ...d.style,
            filter: 'drop-shadow(0 1px 2px rgba(61,46,36,0.06))',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
        />
      ))}
    </div>
  )
}

function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  const scrollToChapters = () => {
    document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <HeroDecorations />

      <div className="text-center max-w-2xl relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-24 h-px mx-auto mb-8"
          style={{ backgroundColor: 'var(--terracotta)', opacity: 0.4 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl md:text-7xl lg:text-8xl italic tracking-tight"
          style={{ color: 'var(--ink-brown)', textShadow: '0 2px 20px rgba(61,46,36,0.08)' }}
        >
          Ella Du
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-sm md:text-base mt-6 tracking-widest uppercase"
          style={{ color: 'var(--soft-brown)' }}
        >
          Musician &middot; Researcher &middot; Memory Keeper
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <div className="w-8 h-px" style={{ backgroundColor: 'var(--soft-brown)', opacity: 0.3 }} />
          <img src="/images/deco-stars.png" alt="" className="w-5 h-5 opacity-20" />
          <div className="w-8 h-px" style={{ backgroundColor: 'var(--soft-brown)', opacity: 0.3 }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -2, y: 10 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="paper-note inline-block mt-10 max-w-md"
          style={{ transform: 'rotate(0.5deg)' }}
        >
          Welcome to my digital diary–where music, stories, and love intertwine.
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToChapters}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        aria-label="Scroll to explore"
      >
        <span className="font-body text-xs tracking-wider uppercase" style={{ color: 'var(--soft-brown)' }}>
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: 'var(--ink-brown)' }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="var(--ink-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}

const fallbackChapters = [
  {
    id: 'music-fb',
    title: 'Music',
    desc: '',
    image: '/images/music-chapter-cover.jpg',
    sticker: 'listen',
    stickerRotate: 8,
    path: '/music',
  },
  {
    id: 'research-fb',
    title: 'Research',
    desc: '',
    image: '/images/research-chapter-cover.jpg',
    sticker: 'read',
    stickerRotate: -6,
    path: '/research',
  },
  {
    id: 'life-fb',
    title: 'Life',
    desc: '',
    image: '/images/life-chapter-cover.jpg',
    sticker: 'browse',
    stickerRotate: 4,
    path: '/life',
  },
]

function Chapters() {
  const { data: dbChapters, loading } = useChapters()
  const chapters = (dbChapters?.length && !loading)
    ? dbChapters.map((c: any) => ({
        id: c.id,
        title: c.title,
        desc: '',
        image: c.imageUrl,
        sticker: c.sticker || '',
        stickerRotate: c.stickerRotate ?? 0,
        path: c.path,
      }))
    : fallbackChapters

  return (
    <section
      id="chapters"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/deco-stars.png"
          alt=""
          className="absolute top-12 right-20 w-10 opacity-10 decoration-star"
          style={{ animationDelay: '1s' }}
        />
        <img
          src="/images/deco-note2.png"
          alt=""
          className="absolute bottom-20 left-16 w-12 opacity-8 decoration-drift"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Explore My World
          </h2>
          <p className="font-handwritten text-xl md:text-2xl mt-3" style={{ color: 'var(--soft-brown)' }}>
            three chapters of my creative life
          </p>
          <svg className="w-32 h-6 mx-auto mt-6" viewBox="0 0 120 20" fill="none">
            <path
              d="M0 10 Q15 0, 30 10 T60 10 T90 10 T120 10"
              stroke="var(--terracotta)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
              fill="none"
            />
          </svg>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, i) => (
            <ScrollReveal key={chapter.id} delay={i * 0.15}>
              <Link to={chapter.path} className="block group">
                <div className="scrapbook-card relative overflow-hidden" style={{ borderTopLeftRadius: '4px' }}>
                  <div
                    className="absolute top-3 right-3 z-10 paper-note px-3 py-1 text-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ transform: `rotate(${chapter.stickerRotate}deg)` }}
                  >
                    {chapter.sticker}
                  </div>

                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-2xl" style={{ color: 'var(--ink-brown)' }}>
                      {chapter.title}
                    </h3>
                    {chapter.desc && (
                      <p className="font-body text-sm mt-2" style={{ color: 'var(--soft-brown)', lineHeight: 1.6 }}>
                        {chapter.desc}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quote() {
  const { data: quote } = useQuote()

  const quoteText = quote?.quoteText ?? "I can burn my city with the music inside me."
  const author = quote?.author ?? "Ella"

  return (
    <section className="relative py-20 md:py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/deco-note1.png"
          alt=""
          className="absolute top-8 left-12 w-8 opacity-10 decoration-drift"
          style={{ animationDelay: '0.3s' }}
        />
        <img
          src="/images/deco-stars.png"
          alt=""
          className="absolute bottom-12 right-16 w-6 opacity-15 decoration-star"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <div className="relative">
            {/* Left decorative quote mark */}
            <span className="font-display text-8xl md:text-9xl absolute -top-8 left-0 md:-left-8 opacity-20" style={{ color: 'var(--terracotta)' }}>
              &ldquo;
            </span>
            {/* Right decorative quote mark */}
            <span className="font-display text-8xl md:text-9xl absolute -bottom-10 right-0 md:-right-4 opacity-20 rotate-180" style={{ color: 'var(--terracotta)' }}>
              &ldquo;
            </span>
            <p className="font-display text-xl md:text-2xl lg:text-[28px] italic leading-relaxed relative z-10 pt-8 pb-8" style={{ color: 'var(--ink-brown)', lineHeight: 1.5 }}>
              {quoteText}
            </p>
          </div>
          <p className="font-handwritten text-2xl mt-6" style={{ color: 'var(--terracotta)' }}>
            — {author}
          </p>
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--terracotta)', opacity: 0.3 }} />
            <img src="/images/deco-stars.png" alt="" className="w-4 h-4 opacity-20" />
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--terracotta)', opacity: 0.3 }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Chapters />
      <Quote />
    </div>
  )
}

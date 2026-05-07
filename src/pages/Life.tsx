import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Heart, Music } from 'lucide-react'
import { usePhotos, usePets, useConcertMemories } from '@/hooks/useSanity'
import ScrollReveal from '../components/ScrollReveal'

function LifeHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const icons = [
    { Icon: Camera, label: 'Photos', id: 'photos' },
    { Icon: Heart, label: 'Pets', id: 'pets' },
    { Icon: Music, label: 'Concerts', id: 'concerts' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img src="/images/life-hero-bg.png" alt="" className="w-full h-full object-cover" style={{ filter: 'blur(3px)' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(247,243,238,0.68)' }} />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl"
          style={{ color: 'var(--ink-brown)' }}
        >
          Life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-handwritten text-xl md:text-2xl mt-4"
          style={{ color: 'var(--soft-brown)' }}
        >
          hold on to the memories, they will hold on to you
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12"
        >
          {icons.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <item.Icon size={24} className="transition-transform duration-200 group-hover:scale-110" style={{ color: 'var(--soft-brown)' }} />
              <span className="font-body text-xs tracking-wider uppercase" style={{ color: 'var(--soft-brown)' }}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const aspectClasses: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

function EmptyState() {
  return (
    <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--cream)' }}>
      <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>
        No content yet. Add in Sanity Studio and click <strong>Publish</strong> to make it visible.
      </p>
    </div>
  )
}

function Photos() {
  const { data: photos } = usePhotos()

  return (
    <section id="photos" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Photos
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            we keep this love in a photograph
          </p>
        </ScrollReveal>

        {(!photos || photos.length === 0) && <EmptyState />}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {photos?.map((photo: any, i: number) => (
            <ScrollReveal key={photo.id} delay={i * 0.08}>
              <div className="break-inside-avoid group">
                <div className="relative overflow-hidden rounded-lg">
                  <div className={`${aspectClasses[photo.aspectRatio || 'square']} overflow-hidden`}>
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-3 px-1">
                  <h4 className="font-display text-base" style={{ color: 'var(--ink-brown)' }}>
                    {photo.title}
                  </h4>
                  <p className="font-body text-sm mt-1" style={{ color: 'var(--soft-brown)', lineHeight: 1.6 }}>
                    {photo.caption}
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

function Pets() {
  const { data: pets } = usePets()

  return (
    <section id="pets" className="py-16 md:py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Pets
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            my little family
          </p>
        </ScrollReveal>

        {(!pets || pets.length === 0) && <EmptyState />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pets?.map((pet: any, i: number) => (
            <ScrollReveal key={pet.id} delay={i * 0.2} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="scrapbook-card flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-[45%] aspect-square md:aspect-auto overflow-hidden flex-shrink-0">
                  <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center relative">
                  <Heart size={16} className="absolute top-4 right-4 opacity-20" style={{ color: 'var(--terracotta)' }} />
                  <h3 className="font-display text-2xl mb-1" style={{ color: 'var(--ink-brown)' }}>
                    {pet.name}
                  </h3>
                  <p className="font-body text-xs tracking-wider uppercase mb-3" style={{ color: 'var(--soft-brown)' }}>
                    {pet.breed}
                  </p>
                  <p className="font-body text-sm mb-3" style={{ color: 'var(--soft-brown)', lineHeight: 1.6 }}>
                    {pet.bio}
                  </p>
                  <p className="font-body text-xs" style={{ color: 'var(--soft-brown)' }}>
                    {pet.dateLabel}
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

function ConcertMemories() {
  const { data: memories } = useConcertMemories()

  return (
    <section id="concerts" className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Concert Memories
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            How the crowds went wild, how I hope they shine.
          </p>
        </ScrollReveal>

        {(!memories || memories.length === 0) && <EmptyState />}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5" style={{ backgroundColor: 'rgba(61,46,36,0.08)' }} />

          <div className="flex flex-col gap-12">
            {memories?.map((mem: any, i: number) => {
              const isLeft = i % 2 === 0
              return (
                <ScrollReveal key={mem.id} delay={i * 0.15} direction={isLeft ? 'left' : 'right'}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.15 }}
                      className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-6 z-10"
                      style={{ backgroundColor: 'var(--terracotta)' }}
                    />

                    <div className={`ml-10 md:ml-0 md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="scrapbook-card overflow-hidden">
                        <div className="aspect-video overflow-hidden">
                          <img src={mem.imageUrl} alt={mem.artist} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="p-5">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-2" style={{ backgroundColor: 'rgba(201,169,110,0.25)', color: 'var(--soft-brown)' }}>
                            {mem.concertDate}
                          </span>
                          <h4 className="font-display text-lg" style={{ color: 'var(--ink-brown)' }}>
                            {mem.artist}
                          </h4>
                          <p className="font-body text-sm mt-1" style={{ color: 'var(--soft-brown)' }}>
                            {mem.venue}
                          </p>
                          <p className="font-handwritten text-lg mt-2" style={{ color: 'var(--terracotta)' }}>
                            {mem.memoryQuote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Life() {
  return (
    <div>
      <LifeHero />
      <Photos />
      <Pets />
      <ConcertMemories />
    </div>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useResearchPapers, useInteractiveInstallations } from '@/hooks/useSanity'
import ScrollReveal from '../components/ScrollReveal'

function ResearchHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img src="/images/research-hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(247,243,238,0.78)' }} />
      </div>

      <div className="text-center max-w-3xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl"
          style={{ color: 'var(--ink-brown)' }}
        >
          Research
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-lg md:text-xl mt-4"
          style={{ color: 'var(--soft-brown)' }}
        >
          Society · Gender · Interactive Media
        </motion.p>

        <motion.div
          initial={{ opacity: 0, rotate: -1, y: 10 }}
          animate={isInView ? { opacity: 1, rotate: -1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="paper-note inline-block mt-8"
          style={{ transform: 'rotate(-1deg)' }}
        >
          academic work with creative heart
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ image, title, brief, categoryTag }: { image: string | null; title: string; brief: string; categoryTag: string }) {
  return (
    <div className="scrapbook-card overflow-hidden group cursor-pointer h-full flex flex-col">
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-7 flex-1 flex flex-col">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-3 w-fit"
          style={{ backgroundColor: 'rgba(143,166,142,0.25)', color: 'var(--soft-brown)' }}
        >
          {categoryTag}
        </span>
        <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: 'var(--ink-brown)' }}>
          {title}
        </h3>
        <p className="font-body text-sm flex-1" style={{ color: 'var(--soft-brown)', lineHeight: 1.7 }}>
          {brief}
        </p>
      </div>
    </div>
  )
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

function ResearchPapers() {
  const { data: papers } = useResearchPapers()

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Research Papers
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            written works & publications
          </p>
        </ScrollReveal>

        {(!papers || papers.length === 0) && <EmptyState />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {papers?.map((paper: any, i: number) => (
            <ScrollReveal key={paper.id} delay={i * 0.15}>
              <ProjectCard
                image={paper.image}
                title={paper.title}
                brief={paper.brief}
                categoryTag={paper.categoryTag}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractiveInstallation() {
  const { data: installations } = useInteractiveInstallations()

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-brown)' }}>
            Interactive Installation
          </h2>
          <p className="font-handwritten text-xl mt-2" style={{ color: 'var(--soft-brown)' }}>
            art that invites participation
          </p>
        </ScrollReveal>

        {(!installations || installations.length === 0) && <EmptyState />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {installations?.map((item: any, i: number) => (
            <ScrollReveal key={item.id} delay={i * 0.15}>
              <ProjectCard
                image={item.image}
                title={item.title}
                brief={item.brief}
                categoryTag={item.categoryTag}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Research() {
  return (
    <div>
      <ResearchHero />
      <ResearchPapers />
      <InteractiveInstallation />
    </div>
  )
}

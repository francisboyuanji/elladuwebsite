import { useNavigate } from 'react-router'
import { ExternalLink, Image, FileText, Music, Heart, Camera, Sparkles } from 'lucide-react'
import { useChapters, useQuote, useSongs, useConcertPhotos, useBehindTheScenes, useThoughts, useResearchPapers, useInteractiveInstallations, usePhotos, usePets, useConcertMemories } from '@/hooks/useSanity'

function StatCard({ icon: Icon, label, count, loading }: { icon: any, label: string, count: number, loading: boolean }) {
  return (
    <div className="scrapbook-card p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(192,122,95,0.12)' }}>
        <Icon size={18} style={{ color: 'var(--terracotta)' }} />
      </div>
      <div>
        <p className="font-body text-xs uppercase tracking-wider" style={{ color: 'var(--soft-brown)' }}>{label}</p>
        <p className="font-display text-2xl" style={{ color: 'var(--ink-brown)' }}>
          {loading ? '...' : count}
        </p>
      </div>
    </div>
  )
}

export default function Admin() {
  const navigate = useNavigate()

  // Load all data for stats
  const { data: chapters, loading: l1 } = useChapters()
  const { data: quote } = useQuote()
  const { data: songs, loading: l3 } = useSongs()
  const { data: concertPhotos, loading: l4 } = useConcertPhotos()
  const { data: bts, loading: l5 } = useBehindTheScenes()
  const { data: thoughts, loading: l6 } = useThoughts()
  const { data: papers, loading: l7 } = useResearchPapers()
  const { data: installations, loading: l8 } = useInteractiveInstallations()
  const { data: photos, loading: l9 } = usePhotos()
  const { data: pets, loading: l10 } = usePets()
  const { data: memories, loading: l11 } = useConcertMemories()

  const stats = [
    { icon: Sparkles, label: 'Chapters', count: chapters?.length ?? 0, loading: l1 },
    { icon: Music, label: 'Songs', count: songs?.length ?? 0, loading: l3 },
    { icon: Camera, label: 'Concert Photos', count: concertPhotos?.length ?? 0, loading: l4 },
    { icon: Image, label: 'Behind Scenes', count: bts?.length ?? 0, loading: l5 },
    { icon: FileText, label: 'Thoughts', count: thoughts?.length ?? 0, loading: l6 },
    { icon: FileText, label: 'Papers', count: papers?.length ?? 0, loading: l7 },
    { icon: Sparkles, label: 'Installations', count: installations?.length ?? 0, loading: l8 },
    { icon: Camera, label: 'Photos', count: photos?.length ?? 0, loading: l9 },
    { icon: Heart, label: 'Pets', count: pets?.length ?? 0, loading: l10 },
    { icon: Music, label: 'Memories', count: memories?.length ?? 0, loading: l11 },
  ]

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 pb-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl" style={{ color: 'var(--ink-brown)' }}>
              Content Dashboard
            </h1>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--soft-brown)' }}>
              Overview of your Sanity CMS content
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="font-body text-sm px-4 py-2 rounded-full border transition-all hover:bg-black/5"
            style={{ borderColor: 'var(--ink-brown)', color: 'var(--ink-brown)' }}
          >
            Back to Site
          </button>
        </div>

        {/* Studio CTA */}
        <div className="scrapbook-card p-8 mb-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <Sparkles size={120} className="absolute -top-6 -right-6" style={{ color: 'var(--terracotta)' }} />
          </div>
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--ink-brown)' }}>
            Manage Your Content
          </h2>
          <p className="font-body text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--soft-brown)', lineHeight: 1.7 }}>
            Use Sanity Studio to create, edit, and organize all your content.
            Changes will reflect instantly on your website.
          </p>
          <button
            onClick={() => navigate('/studio')}
            className="font-body text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--terracotta)', color: 'white' }}
          >
            Open Sanity Studio
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Stats Grid */}
        <h2 className="font-display text-xl mb-4" style={{ color: 'var(--ink-brown)' }}>Content Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quote Preview */}
        {quote && (
          <div className="mt-10">
            <h2 className="font-display text-xl mb-4" style={{ color: 'var(--ink-brown)' }}>Active Quote</h2>
            <div className="scrapbook-card p-6 text-center">
              <p className="font-display text-xl italic" style={{ color: 'var(--ink-brown)' }}>
                &ldquo;{quote.quoteText}&rdquo;
              </p>
              <p className="font-handwritten text-lg mt-2" style={{ color: 'var(--terracotta)' }}>
                — {quote.author}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

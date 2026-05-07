import { useEffect, useState } from 'react'
import { createElement } from 'react'

export default function StudioPage() {
  const [StudioComponent, setStudioComponent] = useState<any>(null)

  useEffect(() => {
    // Lazy load Sanity Studio to avoid SSR/bundle issues
    async function load() {
      const sanity = await import('sanity')
      const { structureTool } = await import('sanity/structure')
      const { visionTool } = await import('@sanity/vision')
      const { schemaTypes } = await import('@/sanity/schema')
      const { ThemeProvider } = await import('@sanity/ui')

      const config = sanity.defineConfig({
        name: 'ella-du-cms',
        title: 'Ella Du CMS',
        projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'zhrziy57',
        dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
        plugins: [structureTool(), visionTool()],
        schema: { types: schemaTypes },
      })

      const studioEl = createElement(sanity.Studio, { config })
      setStudioComponent(() => () => createElement(ThemeProvider, null, studioEl))
    }
    load()
  }, [])

  if (!StudioComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
        <p className="font-body text-sm" style={{ color: 'var(--soft-brown)' }}>Loading Sanity Studio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <StudioComponent />
    </div>
  )
}

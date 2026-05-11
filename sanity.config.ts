import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'ella-du-studio',
  title: 'Ella Du CMS',
  projectId: 'zhrziy57',
  dataset: 'production',
  studioHost: 'zhrziy57',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schema'

const projectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'zhrziy57'
const dataset = import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production'

export default defineConfig({
  name: 'ella-du-cms',
  title: 'Ella Du CMS',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

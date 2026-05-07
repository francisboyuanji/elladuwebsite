import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concertMemory',
  title: 'Concert Memory',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'concertDate', title: 'Date', type: 'string', description: 'e.g. Apr 2025' }),
    defineField({ name: 'artist', title: 'Artist', type: 'string' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'memoryQuote', title: 'Favorite Memory', type: 'text', rows: 2 }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'artist', subtitle: 'concertDate', media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

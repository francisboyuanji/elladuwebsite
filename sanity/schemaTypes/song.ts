import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'genre', title: 'Genre', type: 'string' }),
    defineField({ name: 'description', title: 'One-line Description', type: 'text', rows: 2 }),
    defineField({ name: 'color', title: 'Vinyl Color', type: 'string', initialValue: '#8B7355', description: 'Hex color for the vinyl record' }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (MP3)',
      type: 'file',
      options: {
        accept: 'audio/mp3,audio/mpeg',
      },
    }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'genre', media: 'coverImage' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

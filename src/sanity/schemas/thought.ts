import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'thought',
  title: 'Thought',
  type: 'document',
  fields: [
    defineField({
      name: 'thumbnail',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'dateMonth', title: 'Month', type: 'string', description: 'e.g. Dec' }),
    defineField({ name: 'dateYear', title: 'Year', type: 'string', description: 'e.g. 2024' }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'dateYear', media: 'thumbnail' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

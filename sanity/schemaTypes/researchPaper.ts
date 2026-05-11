import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'researchPaper',
  title: 'Research Paper',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'brief', title: 'Brief', type: 'text', rows: 4 }),
    defineField({ name: 'categoryTag', title: 'Category Tag', type: 'string' }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'categoryTag', media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

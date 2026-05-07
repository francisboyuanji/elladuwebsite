import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concertPhoto',
  title: 'Concert Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

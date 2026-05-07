import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'text', rows: 2 }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      initialValue: 'square',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
        ],
      },
    }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'caption', media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

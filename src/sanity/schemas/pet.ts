import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pet',
  title: 'Pet',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'breed', title: 'Breed', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
    defineField({ name: 'dateLabel', title: 'Date Label', type: 'string', description: 'e.g. Adopted 2022' }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'breed', media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

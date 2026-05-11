import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Home Quote',
  type: 'document',
  fields: [
    defineField({ name: 'quoteText', title: 'Quote Text', type: 'text', rows: 2 }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Ella' }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'quoteText', subtitle: 'author' },
  },
})

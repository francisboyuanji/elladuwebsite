import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'chapter',
  title: 'Home Chapter',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'sticker', title: 'Sticker Text', type: 'string', initialValue: '' }),
    defineField({ name: 'stickerRotate', title: 'Sticker Rotation (deg)', type: 'number', initialValue: 0 }),
    defineField({ name: 'path', title: 'Link Path', type: 'string', initialValue: '/' }),
    defineField({ name: 'orderIndex', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'path', media: 'image' },
  },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] }],
})

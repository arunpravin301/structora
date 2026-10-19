import { defineField, defineType, defineArrayMember } from 'sanity'
import { ProjectValueInput } from '../components/ProjectValueInput'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Project Overview', default: true },
    { name: 'specs', title: 'Area & Cost Specs' },
    { name: 'media', title: 'Photos & Gallery' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (District)',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'builtUp',
      title: 'Built-up Area (Sq.Ft)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'plotSize',
      title: 'Plot Size (e.g. 40X60 or 2400 sq.ft)',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'projectValue',
      title: 'Project Value (INR)',
      type: 'number',
      group: 'specs',
      description: 'Use the Quick Entry bar to enter in Lakhs, Crores, or Thousands, or type the full INR figure directly.',
      components: {
        input: ProjectValueInput,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: ['overview', 'media'],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Photos',
      type: 'array',
      group: 'media',
      options: {
        layout: 'grid',
      },
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Caption / Alternative Text',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      status: 'status',
      builtUp: 'builtUp',
      media: 'coverImage',
    },
    prepare({ title, location, status, builtUp, media }) {
      const statusLabel = status === 'completed' ? 'Completed' : status === 'ongoing' ? 'Ongoing' : 'Draft'
      const areaLabel = builtUp ? `${Number(builtUp).toLocaleString('en-IN')} sq.ft` : ''
      const subtitle = [statusLabel, location, areaLabel].filter(Boolean).join(' · ')
      return {
        title: title || 'Untitled Project',
        subtitle,
        media,
      }
    },
  },
})

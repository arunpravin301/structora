import { defineField, defineType, defineArrayMember } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / 3D Render',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sitePhoto',
      title: 'Actual Site Photo (Execution / Completed)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'builtUp',
      title: 'Built-up Area (Sq.Ft)',
      type: 'number',
    }),
    defineField({
      name: 'plotSize',
      title: 'Plot Size (e.g. 40X60 or 2400 sq.ft)',
      type: 'string',
    }),
    defineField({
      name: 'projectValue',
      title: 'Project Value (INR)',
      type: 'number',
    }),
    defineField({
      name: 'crn',
      title: 'Project Code / CRN (e.g. CRN145310)',
      type: 'string',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Photos',
      type: 'array',
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
})

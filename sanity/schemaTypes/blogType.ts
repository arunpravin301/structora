import { defineField, defineType, defineArrayMember } from 'sanity'
import { SeoTitleInput, SeoDescriptionInput } from '../components/SeoCounterInput'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category / Topic Tag',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Cost & Budgeting', value: 'Cost & Budgeting' },
          { title: 'Planning & Approvals', value: 'Planning & Approvals' },
          { title: 'Material Quality', value: 'Material Quality' },
          { title: 'Construction & Engineering Tips', value: 'Construction & Engineering Tips' },
          { title: 'Architecture & Design', value: 'Architecture & Design' },
        ],
      },
      initialValue: 'Cost & Budgeting',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time (e.g. 5 min read)',
      type: 'string',
      group: 'content',
      description: 'Leave blank to auto-calculate from word count.',
    }),
    defineField({
      name: 'showToc',
      title: 'Display Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Auto-generates an interactive jump-link menu from H2/H3 headings in the article.',
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      group: 'seo',
      components: {
        input: SeoTitleInput,
      },
      validation: (Rule) => Rule.max(60).warning('Optimal SEO titles are under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Meta Description)',
      type: 'text',
      group: 'seo',
      components: {
        input: SeoDescriptionInput,
      },
      validation: (Rule) => Rule.max(160).warning('Optimal descriptions are under 160 characters.'),
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions (FAQ Section)',
      type: 'array',
      group: 'seo',
      description: 'Add 2–5 FAQs related to this topic. Google uses these for People Also Ask rich snippets.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      readTime: 'readTime',
      media: 'mainImage',
    },
    prepare({ title, category, readTime, media }) {
      const subtitle = [category, readTime].filter(Boolean).join(' · ')
      return {
        title: title || 'Untitled Blog Post',
        subtitle: subtitle || 'Construction Guide',
        media,
      }
    },
  },
})

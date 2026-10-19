'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { myTheme } from './sanity/theme'
import { StudioLogo } from './sanity/components/StudioLogo'

export default defineConfig({
  name: 'structora-cms',
  title: 'Structora India CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  theme: myTheme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  plugins: [
    structureTool({
      title: 'Content Desk',
      structure: (S) =>
        S.list()
          .title('Structora Content')
          .items([
            S.listItem()
              .title('All Projects')
              .schemaType('project')
              .child(
                S.documentTypeList('project')
                  .title('All Construction Projects')
                  .defaultOrdering([{ field: '_createdAt', direction: 'asc' }])
              ),
            S.listItem()
              .title('Completed Projects')
              .schemaType('project')
              .child(
                S.documentList()
                  .title('Completed Projects')
                  .filter('_type == "project" && status == "completed"')
              ),
            S.listItem()
              .title('Ongoing Projects')
              .schemaType('project')
              .child(
                S.documentList()
                  .title('Ongoing Projects')
                  .filter('_type == "project" && status == "ongoing"')
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts (Journal)')
              .schemaType('blog')
              .child(
                S.documentTypeList('blog')
                  .title('Blog Posts & Engineering Guides')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

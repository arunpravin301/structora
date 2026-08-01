import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { blogType } from './blogType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, blogType],
}

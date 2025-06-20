import { type SchemaTypeDefinition } from 'sanity'
import { author } from './Author'
import { startup } from './startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,startup],

}

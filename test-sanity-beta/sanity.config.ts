import { createConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default createConfig({
  name: 'default',
  title: 'test-sanity-beta',

  projectId: 'ul838w66',
  dataset: 'production',

  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Bible = defineDocumentType(() => ({
  name: 'Bible',
  filePathPattern: `**/*.md`,
  fields: {},
  computedFields: {
    day: {
      type: 'string',
      resolve: (day) => day._raw.flattenedPath
    }
  },
}))

export default makeSource({ contentDirPath: 'bible', documentTypes: [Bible] })
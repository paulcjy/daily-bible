import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Bible = defineDocumentType(() => ({
  name: 'Bible',
  filePathPattern: `[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9].md`,
  fields: {},
  computedFields: {
    date: {
      type: 'string',
      resolve: (bible) => bible._raw.flattenedPath.split('-')[0],
    },
  },
}))

export default makeSource({ contentDirPath: 'bible', documentTypes: [Bible] })

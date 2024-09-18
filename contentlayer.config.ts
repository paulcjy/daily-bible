import { defineDocumentType, makeSource } from 'contentlayer/source-files'

interface BibleFields {
  date: string
  year: number
  month: number
  day: number
  title: string
}

const createPathParser = () => {
  const cache = new Map()

  return (doc: any): BibleFields => {
    const path = doc._raw.flattenedPath

    if (cache.has(path)) return cache.get(path)

    const [date, ...splitTitle] = path.split('_')

    const [year, month, day] = date.split('/')
    const title = splitTitle.join('\n')

    const result = {
      date,
      year: Number(year),
      month: Number(month),
      day: Number(day),
      title,
    }

    cache.set(path, result)
    return result
  }
}

const pathParser = createPathParser()

export const Bible = defineDocumentType(() => ({
  name: 'Bible',
  filePathPattern: `[0-9][0-9][0-9][0-9]/[0-9][0-9]/*.md`,
  fields: {},
  computedFields: {
    date: {
      type: 'string',
      resolve: (doc) => pathParser(doc).date,
    },
    year: {
      type: 'number',
      resolve: (doc) => pathParser(doc).year,
    },
    month: {
      type: 'number',
      resolve: (doc) => pathParser(doc).month,
    },
    day: {
      type: 'number',
      resolve: (doc) => pathParser(doc).day,
    },
    title: {
      type: 'string',
      resolve: (doc) => pathParser(doc).title,
    },
  },
}))

export default makeSource({ contentDirPath: 'bible', documentTypes: [Bible] })

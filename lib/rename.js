const fs = require('node:fs')
const path = require('node:path')

const book = '히브리서'

const basePath = `./${book}`
const getPath = (filename) => `${basePath}/filename`

const oct = fs.readdirSync(basePath)
console.log(oct)

const startDay = 29
let i = 1
oct.forEach((file) => {
  const [name, ext] = file.split('.')
  const [day, book, chapter] = name.split('_')
  const newName = `${day}_${book}_${i}장.md`
  //   if (file.includes('_')) return
  //   const oldName = file.split('.')[0]
  //   const day = Number(oldName)

  //   const end = 22 + i * 2
  //   const start = end - 1

  //   const newName = `${i + startDay - 1}_${book}_${i}장.md`
  fs.renameSync(`${basePath}/${file}`, `${basePath}/${newName}`)
  i++
  /**
   * day = 1
   * 91-93 = base + 3*day
   */
})

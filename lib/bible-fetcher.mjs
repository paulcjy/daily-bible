import fs from 'node:fs/promises'
import axios from 'axios'
import * as cheerio from 'cheerio'

// URL 생성 함수
const createUrl = (book, chapter) => {
  return `https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=${book}&chap=${chapter}`
}

// HTML 가져오기 함수
const fetchHtml = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`HTML 가져오기 오류: ${error}`)
    return null
  }
}

// 마크다운 생성 함수
const generateChapter = ($) => {
  const isPassingElement = (e) =>
    e.type === 'text' || e.name === 'div' || e.name === 'br' || e.name === 'b'

  const isBookTitle = ($e) => $e.css('display') === 'none'
  const getBookTitle = ($e) => $e.text().trim()

  const isChapterNumber = ($e) => $e.hasClass('chapNum')
  const getChapterTitle = ($e, chapter) => {
    const chapterTitle = `# ${$e.text().trim()}`
    const emptyLine = ''
    chapter.push(chapterTitle, emptyLine)
  }

  const isSmallTitle = ($e) => $e.hasClass('smallTitle')
  const getSmallTitle = ($e, chapter) => {
    const smallTitle = `## ${$e.text().trim()}`
    chapter.push(smallTitle)
  }

  const getVerse = ($e, chapter, $) => {
    const verse = []
    $e.contents().each((i, e) => {
      const $e = $(e)
      const text = $e.text().replaceAll('\n', '')

      if ($e.find('a').length) return
      else if (e.name === 'div') return
      else if ($e.hasClass('number')) verse.push(`${text.trim()}. `)
      else verse.push(text)
    })
    chapter.push(verse.join(''))
  }

  let book = ''
  const chapter = []

  $('#tdBible1')
    .contents()
    .each((i, e) => {
      if (isPassingElement(e)) return

      const $e = $(e)

      if (isBookTitle($e)) book = getBookTitle($e)
      else if (isChapterNumber($e)) getChapterTitle($e, chapter)
      else if (isSmallTitle($e)) getSmallTitle($e, chapter)
      else getVerse($e, chapter, $)
    })

  return { book, chapter: chapter.join('\n') }
}

// 파일 저장 함수
const saveToFile = async (content, filename) => {
  try {
    await fs.writeFile(filename, content)
    console.log(`파일 저장 완료: ${filename}`)
  } catch (error) {
    console.error(`파일 저장 오류: ${error}`)
  }
}

const chapterNotExists = ($) => $('#tdBible1').text().trim() === '개역개정'

// 메인 실행 함수
const main = async (bookCode) => {
  let chapterNumber = 1
  let book = ''
  const chapters = []

  while (true) {
    const url = createUrl(bookCode, chapterNumber)
    const html = await fetchHtml(url)
    if (!html) break

    const $ = cheerio.load(html)

    if (chapterNotExists($)) break

    const { book: bookName, chapter } = generateChapter($)
    if (bookName) book = bookName
    if (!chapter) break

    chapters.push(chapter)
    chapterNumber++
  }

  await saveToFile(chapters.join('\n\n\n').trim(), `${book}.md`)
}

// 실행
const bookCode = 'mat' // 원하는 책 코드를 여기에 입력하세요
main(bookCode)

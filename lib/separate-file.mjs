import fs from 'node:fs/promises'
import path from 'node:path'

async function splitMarkdown(inputFile, outputDir, chunkSize = 1) {
  try {
    const content = await fs.readFile(inputFile, 'utf-8')

    // 각 편을 분리
    const sections = content.split(/(?=# 제 \d+ 장)/).filter((s) => s.trim())

    // 청크로 나누기
    for (let i = 0; i < sections.length; i += chunkSize) {
      const chunk = sections.slice(i, i + chunkSize)

      // 파일 이름 생성
      // const startNum = parseInt(chunk[0].match(/제 (\d+) 편/)[1])
      // const endNum = parseInt(chunk[chunk.length - 1].match(/제 (\d+) 편/)[1])
      const index = Math.floor(i / chunkSize) + 1
      const filename = `${index}.md`

      // 파일 작성
      await fs.writeFile(path.join(outputDir, filename), chunk.join('\n\n'))
    }

    console.log('파일 분할이 완료되었습니다.')
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

// 사용 예
const inputFile = './gen.md' // 입력 파일 이름
const outputDir = './gen' // 출력 디렉토리

async function main() {
  try {
    await splitMarkdown(inputFile, outputDir)
  } catch (error) {
    console.error('메인 함수 에러:', error)
  }
}

main()

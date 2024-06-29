import { allBibles } from 'contentlayer/generated'

export default function BiblePage({ params }: { params: { day: string } }) {
  const bible = allBibles.find(bible => bible.day === params.day)
  return (
    <div
      className='markdown pr-4 pl-6'
      dangerouslySetInnerHTML={{ __html: bible?.body.html }}
    />
  )
}
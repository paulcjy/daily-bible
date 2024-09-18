import { Comments } from '@/components/comment/Comments'
import { allBibles } from 'contentlayer/generated'

export const generateStaticParams = async () =>
  allBibles.map((bible) => {
    const [year, month, day] = bible.date.split('/')
    return { year, month, day }
  })

export default function BiblePage({
  params,
}: {
  params: { year: string; month: string; day: string }
}) {
  const { year, month, day } = params
  const date = `${year}/${month}/${day}`
  const bible = allBibles.find((bible) => bible.date === date)

  if (!bible) return <h1>등록된 말씀이 없습니다.</h1>

  return (
    <>
      <div
        className="markdown pr-4 pl-6 mb-16 -mt-4"
        dangerouslySetInnerHTML={{ __html: bible.body.html }}
      />
      <Comments date={date} />
    </>
  )
}

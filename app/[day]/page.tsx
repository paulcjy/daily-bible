import Comments from '@/components/Comments'
import { Bible, allBibles } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () =>
  allBibles.map((bible) => ({
    day: bible.day,
  }))

export default function BiblePage({ params }: { params: { day: string } }) {
  const bible = allBibles.find((bible) => bible.day === params.day)
  if (!bible) notFound()

  return (
    <>
      <div
        className="markdown pr-4 pl-6 mb-16 -mt-4"
        dangerouslySetInnerHTML={{ __html: bible.body.html }}
      />
      <Comments pageId={params.day} />
    </>
  )
}

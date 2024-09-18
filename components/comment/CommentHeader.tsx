import { MessageSquare } from 'lucide-react'

export const CommentHeader = () => {
  return (
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <MessageSquare className="mr-2" />
      댓글
    </h2>
  )
}

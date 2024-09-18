import { db } from '@/firebase'
import { ref, remove } from 'firebase/database'
import { Trash2 } from 'lucide-react'

export interface Comment {
  id?: string
  author: string
  content: string
  timestamp: number
}

export const Comment = ({ comment, date }: any) => {
  const handleDelete = async (commentId: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        const commentRef = ref(db, `comments/${date}/${commentId}`)
        await remove(commentRef)
      } catch (e) {
        console.error('Error deleting comment:', e)
      }
    }
  }

  return (
    <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
      <div className="font-bold mb-2">{comment.author}</div>
      <p className="mb-2">{comment.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(comment.timestamp).toLocaleString()}</span>
        {/* <button
          onClick={() => handleDelete(comment.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <Trash2 className="h-4 w-4" />
        </button> */}
      </div>
    </div>
  )
}

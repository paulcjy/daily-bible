import { db } from '@/firebase'
import { push, ref } from 'firebase/database'
import { Send } from 'lucide-react'
import { FormEventHandler, useState } from 'react'

export const CommentForm = ({ date }: { date: string }) => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const isNotFull = (...args: string[]) => !args.every((s) => s.trim())

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (isNotFull(author, content)) return
    try {
      const commentsRef = ref(db, `comments/${date}`)
      const comment = {
        author: author.trim(),
        content: content.trim(),
        timestamp: Date.now(),
      }
      await push(commentsRef, comment)
      setContent('')
    } catch (e) {
      console.error('Error posting comment:', e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="이름"
          required
        />
      </div>
      <div className="flex items-center">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="댓글을 입력하세요."
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isNotFull(author, content)}
        >
          <Send className="h-6 w-6" />
        </button>
      </div>
    </form>
  )
}

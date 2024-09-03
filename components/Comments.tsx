'use client'
import React, { useState, useEffect, FormEventHandler, FormEvent } from 'react'
import { db, auth } from '../firebase'
import { ref, push, onValue, remove } from 'firebase/database'
import { signInAnonymously } from 'firebase/auth'
import { MessageSquare, Send } from 'lucide-react'

interface Comment {
  id?: string
  author: string
  content: string
  timestamp: number
}

export default function Comments({ pageId }: { pageId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 익명 인증
    signInAnonymously(auth).catch((error) => {
      console.error('Anonymous auth error:', error)
    })

    // 댓글 불러오기
    const commentsRef = ref(db, `comments/${pageId}`)
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const commentList = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            ...value,
          })
        )
        setComments(commentList.sort((a, b) => b.timestamp - a.timestamp))
      } else {
        setComments([])
      }
    })

    return () => unsubscribe()

    // const commentsRef = ref(db, `comments/${pageId}`)
    // onValue(commentsRef, (snapshot) => {
    //   const data: { [id: string]: Comment } = snapshot.val()
    //   if (data) {
    //     const commentList = Object.entries(data).map(([key, value]) => ({
    //       id: key,
    //       ...value,
    //     }))
    //     setComments(commentList.sort((a, b) => b.timestamp - a.timestamp))
    //   } else {
    //     setComments([])
    //   }
    // })
  }, [pageId])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return

    try {
      const commentsRef = ref(db, `comments/${pageId}`)
      await push(commentsRef, {
        author: authorName.trim(),
        content: newComment.trim(),
        timestamp: Date.now(),
      })
      setNewComment('')
      // authorName은 유지
    } catch (error) {
      console.error('Error posting comment:', error)
    }

    // e.preventDefault()
    // if (!newComment.trim() || !authorName.trim()) return

    // setIsLoading(true)
    // try {
    //   await signInAnonymously(auth)
    //   const commentsRef = ref(db, `comments/${pageId}`)
    //   await push(commentsRef, {
    //     author: authorName.trim(),
    //     content: newComment.trim(),
    //     timestamp: Date.now(),
    //   })
    //   setNewComment('')
    //   // 작성자 이름은 유지합니다.
    // } catch (error) {
    //   console.error('Error posting comment:', error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const handleDelete = async (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const commentRef = ref(db, `comments/${pageId}/${commentId}`)
        await remove(commentRef)
      } catch (error) {
        console.error('Error deleting comment:', error)
      }
    }
  }

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2" />
        댓글
      </h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이름"
            required
          />
        </div>
        <div className="flex items-center">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 입력하세요."
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading || !newComment.trim() || !authorName.trim()}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <Send className="h-6 w-6" />
            )}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {comments.map((comment: Comment) => (
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
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Comment } from './Comment'
import { signInAnonymously } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { onValue, ref } from 'firebase/database'
import { CommentHeader } from './CommentHeader'
import { CommentForm } from './CommentForm'

export const Comments = ({ date }: { date: string }) => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    signInAnonymously(auth).catch((e) =>
      console.error('Anonymous auth error:', e)
    )

    const commentsRef = ref(db, `comments/${date}`)
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data: { [id: string]: Comment } = snapshot.val()
      if (data) {
        const asc = (a: Comment, b: Comment) => a.timestamp - b.timestamp
        const commentList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))
        setComments(commentList.sort(asc))
      } else {
        setComments([])
      }
    })

    return () => unsubscribe()
  }, [date])

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
      <CommentHeader />
      <CommentForm date={date} />
      <div className="space-y-4">
        {comments.map((comment: Comment) => (
          <Comment key={comment.id} comment={comment} date={date} />
        ))}
      </div>
    </div>
  )
}

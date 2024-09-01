'use client'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import { ref, push, onValue, remove } from 'firebase/database'
import { signInAnonymously } from 'firebase/auth'

export default function Comments({ pageId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const commentsRef = ref(db, `comments/${pageId}`)
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const commentList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))
        setComments(commentList)
      } else {
        setComments([])
      }
    })
  }, [pageId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await signInAnonymously(auth)
      const commentsRef = ref(db, `comments/${pageId}`)
      await push(commentsRef, {
        text: newComment,
        timestamp: Date.now(),
      })
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post Comment
        </button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
            <p>{comment.text}</p>
            <small>{new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

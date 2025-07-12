import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser, useSignIn } from '@clerk/clerk-react'

export default function QuestionDetail() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [answerText, setAnswerText] = useState('')
  const { user } = useUser()
  const { signIn } = useSignIn()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5050/api/questions/${id}`)
        const data = await res.json()
        setQuestion(data.question)
        setAnswers(data.answers)
      } catch (err) {
        console.error('Failed to fetch question details', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleLogin = () => {
    if (!user) {
      document.getElementById('clerk-sign-in-button')?.click()
    }
  }

  const submitAnswer = async () => {
    if (!user) return handleLogin()

    try {
      const res = await fetch('http://localhost:5050/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: answerText,
          questionId: id,
          userId: user.id,
        }),
      })
      const data = await res.json()
      setAnswers([data.answer, ...answers])
      setAnswerText('')
    } catch (err) {
      console.error('Failed to submit answer:', err)
    }
  }

  const vote = async (answerId, type) => {
    if (!user) return handleLogin()

    try {
      const res = await fetch(`http://localhost:5050/api/answers/${answerId}/${type}`, {
        method: 'POST',
      })
      const data = await res.json()

      setAnswers(prev =>
        prev.map(a =>
          a._id === answerId
            ? {
                ...a,
                upvotes: type === 'upvote' ? a.upvotes + 1 : a.upvotes,
                downvotes: type === 'downvote' ? a.downvotes + 1 : a.downvotes,
              }
            : a
        )
      )
    } catch (err) {
      console.error('Failed to vote:', err)
    }
  }

  if (loading) return <div className="text-white p-4">Loading...</div>
  if (!question) return <div className="text-white p-4">Question not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
      <p className="mb-4 text-gray-300" dangerouslySetInnerHTML={{ __html: question.description }}></p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Answers</h2>
        {answers.length === 0 ? (
          <p className="text-gray-400">No answers yet.</p>
        ) : (
          answers.map((answer) => (
            <div key={answer._id} className="bg-gray-800 p-4 rounded mb-2">
              <p className="text-gray-200">{answer.content}</p>
              <div className="text-sm text-gray-500 mt-2 flex gap-4 items-center">
                <button onClick={() => vote(answer._id, 'upvote')} className="hover:text-green-400">⬆ {answer.upvotes}</button>
                <button onClick={() => vote(answer._id, 'downvote')} className="hover:text-red-400">⬇ {answer.downvotes}</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Your Answer</h3>
        <textarea
          rows={5}
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Write your answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>
        <button
          onClick={submitAnswer}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Submit Answer
        </button>
      </div>

      {/* Clerk fallback */}
      <div style={{ display: 'none' }}>
        <button id="clerk-sign-in-button" onClick={() => signIn?.()}></button>
      </div>
    </div>
  )
}
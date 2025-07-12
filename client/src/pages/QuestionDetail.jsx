import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function QuestionDetail() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [newAnswer, setNewAnswer] = useState("") // <-- Track new answer

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData()
  }, [id])

  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim()) return;

    try {
      const res = await fetch('http://localhost:5050/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId: id,
          content: newAnswer
        })
      });

      if (!res.ok) throw new Error('Failed to submit answer');

      const data = await res.json();
      setNewAnswer("");             // Clear textarea
      setAnswers([data.answer, ...answers]); // Add new answer to top
    } catch (err) {
      console.error("Error submitting answer", err);
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
              <div className="text-sm text-gray-500 mt-2">
                Votes: {answer.votes}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Your Answer</h3>
        <textarea
          rows={5}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Write your answer..."
        ></textarea>
        <button
          onClick={handleAnswerSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Submit Answer
        </button>
      </div>
    </div>
  )
}

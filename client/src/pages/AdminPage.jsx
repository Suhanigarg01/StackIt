import React, { useEffect, useState } from 'react'

export default function AdminPage() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:5050/api/questions/admin/all')
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(err => console.error('Failed to load questions:', err))
  }, [])

  const deleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return

    try {
      const res = await fetch(`http://localhost:5050/api/questions/admin/${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (res.ok) {
        setQuestions(prev => prev.filter(q => q._id !== id))
        alert('Question deleted')
      } else {
        alert(data.message || 'Failed to delete question')
      }
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Questions</h1>
      {questions.length === 0 ? (
        <p className="text-gray-400">No questions found.</p>
      ) : (
        questions.map(q => (
          <div key={q._id} className="bg-gray-800 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold">{q.title}</h2>
            <div
              className="text-sm text-gray-300 mt-2"
              dangerouslySetInnerHTML={{ __html: q.description }}
            ></div>
            <button
              onClick={() => deleteQuestion(q._id)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}
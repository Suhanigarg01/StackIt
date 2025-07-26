import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useSignIn, useAuth } from '@clerk/clerk-react';

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState('');
  const { user } = useUser();
  const { signIn } = useSignIn();
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5050/api/questions/${id}`);
        const data = await res.json();
        setQuestion(data.question);
        setAnswers(data.answers);
      } catch (err) {
        console.error('Failed to fetch question details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleLogin = () => {
    if (!user) {
      document.getElementById('clerk-sign-in-button')?.click();
    }
  };

  const submitAnswer = async () => {
    if (!user) return handleLogin();

    try {
      const token = await getToken();
      const res = await fetch('http://localhost:5050/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: answerText,
          questionId: id,
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.error('Failed to submit answer:', data.error);
        return;
      }

      setAnswers([data.answer, ...answers]);
      setAnswerText('');
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const vote = async (answerId, type) => {
    if (!user) return handleLogin();

    try {
      const token = await getToken();
      const res = await fetch(
        `http://localhost:5050/api/answers/${answerId}/${type}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.error) {
        console.error('Failed to vote:', data.error);
        return;
      }

      setAnswers((prev) =>
        prev.map((a) =>
          a._id === answerId
            ? {
                ...a,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
              }
            : a
        )
      );
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (!question) return <div className="text-white p-4">Question not found</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-32 pb-16">
      <div className="max-w-4xl mx-auto">

        {/* Question Block */}
        <div className="mb-10 bg-[#121212] p-8 rounded-3xl shadow-[8px_8px_25px_rgba(255,255,255,0.05)]">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {question.title}
          </h1>
          <div
            className="text-gray-300 text-lg"
            dangerouslySetInnerHTML={{ __html: question.description }}
          ></div>
        </div>

        {/* Answers */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Answers</h2>
          {answers.length === 0 ? (
            <p className="text-gray-500">No answers yet.</p>
          ) : (
            answers.map((answer) => (
              <div
                key={answer._id}
                className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-5 mb-5 shadow hover:shadow-lg transition"
              >
                <p className="text-gray-200">{answer.content}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-400 items-center">
                  <button
                    onClick={() => vote(answer._id, 'upvote')}
                    className="hover:text-green-400 transition"
                  >
                    ⬆ {answer.upvotes}
                  </button>
                  <button
                    onClick={() => vote(answer._id, 'downvote')}
                    className="hover:text-red-400 transition"
                  >
                    ⬇ {answer.downvotes}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Your Answer Form */}
        <div className="bg-[#121212] p-8 rounded-3xl shadow-[6px_6px_20px_rgba(255,255,255,0.05)]">
          <h3 className="text-xl font-medium mb-3">Your Answer</h3>
          <textarea
            rows={5}
            className="w-full p-4 rounded-xl bg-[#1f1f1f] border border-gray-700 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your answer..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></textarea>
          <button
            onClick={submitAnswer}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-full transition-all hover:scale-105"
          >
            Submit Answer
          </button>
        </div>

        {/* Clerk fallback */}
        <div style={{ display: 'none' }}>
          <button id="clerk-sign-in-button" onClick={() => signIn?.()}></button>
        </div>
      </div>
    </div>
  );
}

// client/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("Newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-2 sm:px-8 py-6 pt-36">
      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
        <div className="flex gap-2">
          <select
            className="bg-gray-800 border-none text-white px-3 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Newest</option>
            <option>Unanswered</option>
            <option>Most Answered</option>
          </select>
        </div>
        <div className="flex-1 flex justify-end">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white px-3 py-2 rounded-l w-40 sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-r">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q) => (
          <Link to={`/questions/${q._id}`} key={q._id}>
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition cursor-pointer">
              <h2 className="text-lg font-semibold mb-2">{q.title}</h2>
              <div className="flex gap-2 mb-2">
                {q.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-2" dangerouslySetInnerHTML={{ __html: q.description }}></p>
              <span className="text-gray-400 text-xs">Status: {q.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

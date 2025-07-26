import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("Newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://stackit-rd4u.onrender.com/api/questions"); // ← Replace with your deployed backend URL
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  // 🔍 Apply search and filter logic
  const filteredQuestions = questions
    .filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());

      if (filter === "Unanswered") return q.status === "unanswered" && matchesSearch;
      if (filter === "Most Answered") return q.answers?.length > 0 && matchesSearch;

      return matchesSearch; // For "Newest" and default
    })
    .sort((a, b) => {
      if (filter === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-6 pt-36">
      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <select
          className="bg-[#1a1a1a] border border-gray-700 text-white px-3 py-2 rounded w-full sm:w-44"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Newest</option>
          <option>Unanswered</option>
          <option>Most Answered</option>
        </select>

        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search questions..."
            className="bg-[#1a1a1a] text-white px-4 py-2 rounded-l w-full sm:w-64 border border-gray-700 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r border border-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">No questions found.</p>
        ) : (
          filteredQuestions.map((q) => (
            <Link to={`/questions/${q._id}`} key={q._id}>
              <div className="group bg-[#121212] hover:bg-[#1e1e1e] border border-gray-800 rounded-xl p-5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition">
                  {q.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-3">
                  {q.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  className="text-gray-400 text-sm mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                ></p>

                <span
                  className={`text-xs font-medium ${
                    q.status === "unanswered"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  Status: {q.status}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

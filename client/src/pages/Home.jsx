import React, { useState } from "react";

const dummyQuestions = [
  {
    id: 1,
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description:
      "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine ...",
    tags: ["SQL", "Beginner"],
    user: "User Name",
    answers: 5,
  },
  {
    id: 2,
    title: "How to create a responsive navbar in React?",
    description: "Looking for best practices to create a responsive navbar using React and Tailwind CSS.",
    tags: ["React", "Tailwind"],
    user: "Jane Doe",
    answers: 3,
  },
  // Add more dummy questions as needed
];

const totalPages = 7;

export default function Home() {
  const [questions, setQuestions] = useState(dummyQuestions);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("Newest");
  const [search, setSearch] = useState("");

  // Placeholder for fetching questions from backend
  // useEffect(() => {
  //   fetchQuestions();
  // }, [currentPage, filter, search]);
    return(
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
          <button className="bg-gray-800 px-3 py-2 rounded">More ▼</button>
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
          <div key={q.id} className="bg-gray-800 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">{q.title}</h2>
              <div className="flex gap-2 mb-2">
                {q.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-2">{q.description}</p>
              <span className="text-gray-400 text-xs">by {q.user}</span>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center">
              <span className="bg-blue-600 px-3 py-1 rounded text-white font-bold">{q.answers} ans</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
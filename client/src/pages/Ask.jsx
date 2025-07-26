import React, { useState } from 'react';
import './quill-custom.css'; // if needed for custom styles

const TAG_OPTIONS = ['React', 'JWT', 'JavaScript', 'Node.js', 'CSS', 'HTML'];

const Ask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCustomTagAdd = () => {
    const trimmed = customTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setCustomTag('');
    setShowTagInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://stackit-rd4u.onrender.com/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, tags }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Question submitted!');
        setTitle('');
        setDescription('');
        setTags([]);
      } else {
        alert('❌ Submission failed: ' + data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start pt-40 pb-16 px-4">
      <div className="w-full max-w-3xl bg-[#121212] rounded-3xl shadow-[8px_8px_25px_rgba(255,255,255,0.07)] p-10 transition duration-300 hover:shadow-[10px_10px_30px_rgba(255,255,255,0.1)]">
        
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-400">
          Ask a Question
        </h2>

        {/* Title */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to center a div in Flexbox?"
            className="w-full px-4 py-3 bg-[#1f1f1f] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">Description</label>
          <div className="h-60 bg-[#1f1f1f] text-white border border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your problem in detail..."
              className="w-full h-full bg-transparent p-4 resize-none focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-10">
          <label className="block text-lg font-medium mb-3">Tags</label>
          <div className="flex flex-wrap gap-3 items-center">
            {TAG_OPTIONS.map((tag) => (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer border transition transform hover:scale-105 ${
                  tags.includes(tag)
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-[#1f1f1f] border-gray-600 text-gray-300 hover:bg-blue-700'
                }`}
              >
                {tag}
              </span>
            ))}

            {/* Custom Tags */}
            {tags
              .filter((tag) => !TAG_OPTIONS.includes(tag))
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm border border-blue-500"
                >
                  {tag}
                </span>
              ))}

            {/* Add Custom Tag Input */}
            {showTagInput ? (
              <input
                autoFocus
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onBlur={handleCustomTagAdd}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomTagAdd();
                  }
                }}
                className="px-3 py-2 rounded-full text-sm bg-[#1f1f1f] border border-blue-500 focus:outline-none text-white w-36"
                placeholder="Add tag"
              />
            ) : (
              <button
                onClick={() => setShowTagInput(true)}
                className="bg-[#1f1f1f] text-blue-400 px-4 py-2 rounded-full text-lg border border-blue-600 hover:bg-blue-700 hover:text-white transition"
              >
                +
              </button>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition-all hover:scale-105"
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ask;

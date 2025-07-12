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

  return (
    <>
        <h1>HOME</h1>
    </>
  )
}

export default Home

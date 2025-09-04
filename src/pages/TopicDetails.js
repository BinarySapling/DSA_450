// src/pages/TopicDetails.js
import { useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import { motion } from "framer-motion";
import { QuestionsContext } from "../context/QuestionsContext";

function TopicDetails() {
  const { topicName } = useParams();
  const { questions, bookmarks, status, updateBookmarks, updateStatus, isLoading } =
    useContext(QuestionsContext);
  const [sortDifficulty, setSortDifficulty] = useState("All");

  // Filter and sort questions
  const topicQuestions = useMemo(() => {
    let filteredQuestions = questions.filter((q) => q.Topic === topicName);
    
    // Sort by difficulty
    if (sortDifficulty !== "All") {
      filteredQuestions = filteredQuestions.filter((q) => q.difficulty === sortDifficulty);
    } else {
      // Sort by difficulty order: Easy, Medium, Hard
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      filteredQuestions = [...filteredQuestions].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    }
    
    return filteredQuestions;
  }, [questions, topicName, sortDifficulty]);

  if (isLoading) return <div className="text-center text-purple-400">Loading...</div>;

  return (
    <motion.div
      className="p-6 min-h-screen bg-black text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-300 drop-shadow-lg">
          {topicName}
        </h1>
        <div className="relative">
          <select
            value={sortDifficulty}
            onChange={(e) => setSortDifficulty(e.target.value)}
            className="bg-gray-900 text-purple-300 border border-purple-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none pr-8"
            aria-label="Sort by difficulty"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {/* Custom arrow for dropdown */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <QuestionList
        questions={topicQuestions}
        bookmarks={bookmarks}
        status={status}
        handleBookmark={updateBookmarks}
        handleStatusChange={updateStatus}
      />
    </motion.div>
  );
}

export default TopicDetails;
// src/components/QuestionList.js
import React from "react";
import { motion } from "framer-motion";

export default function QuestionList({
  questions,
  bookmarks,
  status,
  handleBookmark,
  handleStatusChange,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      {questions.map((q) => (
        <motion.div
          key={q["Problem Name"]}
          variants={cardVariants}
          className="bg-gray-900 p-5 rounded-xl shadow-lg border border-purple-800 hover:border-purple-500 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <a
              href={q["LeetCode Link (auto-generated)"]}
              target="_blank"
              rel="noreferrer"
              className="text-lg font-semibold text-purple-300 hover:text-purple-200 transition-colors"
            >
              {q["Problem Name"]}
            </a>
            <button
              onClick={() => handleBookmark(q["Problem Name"])}
              className={`px-3 py-1 rounded-lg transition ${
                bookmarks[q["Problem Name"]]
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400"
              } hover:bg-purple-500`}
              aria-label={`Bookmark ${q["Problem Name"]}`}
            >
              ★
            </button>
          </div>

          {/* Difficulty Tag */}
          <span
            className={`inline-block text-xs px-3 py-1 rounded-full mt-2 ${
              q.difficulty === "Hard"
                ? "bg-red-900 text-red-300"
                : q.difficulty === "Medium"
                ? "bg-yellow-900 text-yellow-300"
                : "bg-green-900 text-green-300"
            }`}
          >
            {q.difficulty}
          </span>

          {/* Companies Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {q.companies?.split(",").map((company) => (
              <span
                key={company}
                className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-xs flex items-center gap-1"
              >
                <img
                  src={`/company-logos/${company.trim().toLowerCase()}.svg`}
                  alt={company}
                  className="w-4 h-4"
                  onError={(e) => (e.target.style.display = "none")}
                />
                {company}
              </span>
            ))}
          </div>

          {/* Solved & Revision Checkboxes */}
          <div className="mt-4 flex gap-4 text-sm">
            <label
              htmlFor={`solved-${q["Problem Name"]}`}
              className="flex items-center gap-2 text-gray-300"
            >
              <input
                id={`solved-${q["Problem Name"]}`}
                type="checkbox"
                checked={status[q["Problem Name"]]?.solved || false}
                onChange={() => handleStatusChange(q["Problem Name"], "solved")}
                className="accent-purple-600 h-4 w-4"
              />
              Solved
            </label>
            <label
              htmlFor={`revision-${q["Problem Name"]}`}
              className="flex items-center gap-2 text-gray-300"
            >
              <input
                id={`revision-${q["Problem Name"]}`}
                type="checkbox"
                checked={status[q["Problem Name"]]?.revision || false}
                onChange={() => handleStatusChange(q["Problem Name"], "revision")}
                className="accent-purple-600 h-4 w-4"
              />
              Mark for Revision
            </label>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
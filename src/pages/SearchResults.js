// src/pages/SearchResults.js
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QuestionsContext } from "../context/QuestionsContext";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { questions, isLoading } = useContext(QuestionsContext);
  const results = questions.filter((q) =>
    q["Problem Name"].toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <div className="text-center text-purple-400">Loading...</div>;

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-2xl font-bold mb-6 text-purple-300 drop-shadow">
        Search Results for "{query}"
      </h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No questions found.</p>
      ) : (
        <div className="bg-gray-900 shadow-lg rounded-xl p-5 border border-purple-800">
          {results.map((q) => (
            <div
              key={q["Problem Name"]}
              className="py-3 border-b border-purple-800 last:border-none"
            >
              <a
                href={q["LeetCode Link (auto-generated)"]}
                target="_blank"
                rel="noreferrer"
                className="text-purple-300 font-medium hover:text-purple-200 transition-colors"
              >
                {q["Problem Name"]}
              </a>
              <p className="text-sm text-gray-400 mt-1">
                Topic:{" "}
                <Link
                  to={`/topic/${encodeURIComponent(q.Topic)}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {q.Topic}
                </Link>{" "}
                | Difficulty:{" "}
                <span
                  className={
                    q.difficulty === "Easy"
                      ? "text-green-400"
                      : q.difficulty === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {q.difficulty}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
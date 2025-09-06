// src/pages/Home.js
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "../context/QuestionsContext";

function Home() {
  const navigate = useNavigate();
  const { questions, isLoading } = useContext(QuestionsContext);

  // Compute topics and their question counts at the top level
  const topicData = useMemo(() => {
    const topics = [...new Set(questions.map((q) => q.Topic))];
    const topicCounts = topics.map((topic) => ({
      topic,
      count: questions.filter((q) => q.Topic === topic).length,
    }));
    return topicCounts;
  }, [questions]);

  if (isLoading) return <div className="text-center text-purple-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-10 drop-shadow-lg">
        🚀 FAANG 450
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topicData.map(({ topic, count }) => (
          <div
            key={topic}
            onClick={() => navigate(`/topic/${encodeURIComponent(topic)}`)}
            className="cursor-pointer bg-gray-900 bg-opacity-80 backdrop-blur-lg 
                       p-6 rounded-xl shadow-lg border border-purple-900
                       hover:shadow-2xl hover:scale-105 hover:border-purple-500
                       transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-purple-300">{topic}</h2>
            <p className="text-gray-400 mt-2">{count} questions</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

// src/components/Layout.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Global Navbar */}
      <div className="bg-gradient-to-r from-purple-900 to-black p-4 shadow-lg border-b border-purple-800 flex flex-col md:flex-row md:items-center gap-3">
        <h1
          className="text-xl font-bold cursor-pointer text-purple-300 hover:text-purple-200 transition-colors"
          onClick={() => navigate("/")}
        >
          FAANG 450
        </h1>
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 md:ml-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for questions..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            aria-label="Search questions"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors"
            aria-label="Search questions"
          >
            Search
          </button>
        </form>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto p-6">{children}</div>
    </div>
  );
}

export default Layout;

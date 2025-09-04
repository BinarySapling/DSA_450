// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TopicDetails from "./pages/TopicDetails";
import Layout from "./components/Layout";
import { QuestionsProvider } from "./context/QuestionsContext";

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/topic/:topicName" element={<TopicDetails />} />
          </Routes>
        </Layout>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
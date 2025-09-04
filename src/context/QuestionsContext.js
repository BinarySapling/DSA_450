// src/context/QuestionsContext.js
import React, { createContext, useState, useEffect } from "react";
import questionsData from "../data/questions.json";

export const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState({});
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedQuestions = JSON.parse(localStorage.getItem("questions")) || questionsData;
      const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
      const storedStatus = JSON.parse(localStorage.getItem("status")) || {};
      setQuestions(storedQuestions);
      setBookmarks(storedBookmarks);
      setStatus(storedStatus);
      localStorage.setItem("questions", JSON.stringify(storedQuestions));
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setQuestions(questionsData);
      setIsLoading(false);
    }
  }, []);

  const updateBookmarks = (problemName) => {
    const updated = { ...bookmarks, [problemName]: !bookmarks[problemName] };
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const updateStatus = (problemName, key) => {
    const updated = {
      ...status,
      [problemName]: {
        ...status[problemName] || {},
        [key]: !status[problemName]?.[key],
      },
    };
    setStatus(updated);
    localStorage.setItem("status", JSON.stringify(updated));
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, bookmarks, status, updateBookmarks, updateStatus, isLoading }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
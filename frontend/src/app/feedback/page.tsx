"use client";

import BackButton from "@/components/BackButton";
import { Feedback } from "@/utils/types";
import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const apiUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5086";
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/feedbacks`);
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return [];
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorName: name,
          content,
          isPublic: isPublic,
          createdAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setRefresh(!refresh);
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
          setContent("");
          setName("");
        }, 1500);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    const loadFeedbacks = async () => {
      const data = await fetchFeedbacks();
      setFeedbacks(data);
    };
    loadFeedbacks();
  }, [refresh]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          💬 Feedback from Our Users
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 italic">
          Thanks for your feedback to help us improve Number Hoas!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 items-stretch">
  {feedbacks.map((feedback: Feedback) => (
    <div
      key={feedback.feedbackId}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col h-full transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-200 dark:hover:shadow-blue-900"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-bold text-blue-700 dark:text-blue-300 text-xl truncate max-w-[70%]">
          {feedback.isPublic && feedback.authorName
            ? feedback.authorName
            : "Anonymous"}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(feedback.createdAt)}
        </span>
      </div>
      <div className="relative bg-blue-50 dark:bg-blue-950 rounded-2xl p-7 text-gray-800 dark:text-gray-100 shadow-inner flex-1 flex items-center">
        <svg
          className="absolute -top-4 left-4 w-8 h-8 text-blue-200 dark:text-blue-900 opacity-60"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.17 6A5.001 5.001 0 002 11c0 2.76 2.24 5 5 5v2c-3.87 0-7-3.13-7-7a7 7 0 017-7v2zm9.66 0A5.001 5.001 0 0011.83 11c0 2.76 2.24 5 5 5v2c-3.87 0-7-3.13-7-7a7 7 0 017-7v2z" />
        </svg>
        <span className="text-lg leading-relaxed break-words break-all whitespace-pre-line w-full">
          {feedback.content}
        </span>
      </div>
    </div>
  ))}
</div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <span className="text-lg">💬</span>Send Feedback
        </button>
      )}

      {/* Form feedback */}
      {showForm && (
        <div className="fixed bottom-8 right-8 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 w-[420px]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">
              Feedback
            </span>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
            >
              &times;
            </button>
          </div>
          {submitted ? (
            <div className="text-green-600 dark:text-green-300 font-semibold py-8 text-center text-lg">
              Thanks for your feedback! We will review it soon.
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Your feedback..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition resize-none text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                style={{ resize: "none" }}
              />
              <div className="flex items-center justify-between gap-4">
                {/* Switch for isPublic */}
                <div className="flex items-center gap-2 min-w-[130px]">
                  <label
                    htmlFor="isPublic"
                    className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-1 w-[110px]"
                  >
                    {isPublic ? (
                      <span className="inline-flex items-center text-blue-600 w-full">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          />
                        </svg>
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-gray-500 w-full">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          />
                        </svg>
                        Anonymous
                      </span>
                    )}
                  </label>
                  <button
                    type="button"
                    id="isPublic"
                    aria-pressed={isPublic}
                    onClick={() => setIsPublic((v) => !v)}
                    className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                      isPublic ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                        isPublic ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow transition text-base"
                >
                  Send Feedback
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <BackButton to="/" />
      </div>
    </div>
  );
}

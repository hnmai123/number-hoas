"use client";

import BackButton from "@/components/BackButton";
import { Question, Session } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ReviewSessionPageProps = {
  gameId: string;
  sessionId: string;
};

export default function ReviewSession({
  gameId,
  sessionId,
}: ReviewSessionPageProps) {
  const apiUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5086";
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionInfo, setSessionInfo] = useState<Session | null>(null);
  const fetchQuestions = async (gameId: string, sessionId: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/games/${gameId}/sessions/${sessionId}/questions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };
  const fetchSessionInfo = async (gameId: string, sessionId: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/games/${gameId}/sessions/${sessionId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch session info");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching session info:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await fetchQuestions(gameId, sessionId);
      const sessionInfo = await fetchSessionInfo(gameId, sessionId);
      setSessionInfo(sessionInfo);
      setQuestions(questions);
    };
    loadQuestions();
  }, [gameId, sessionId]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-300">
        Session Review
      </h1>

      {/* Card Header Info */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Player:{" "}
              <span className="font-bold">
                {sessionInfo?.playerName ?? "N/A"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17v.01M12 7v6m0 0a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Score:{" "}
              <span className="font-bold">{sessionInfo?.score ?? "N/A"}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Result:{" "}
              <span className="font-bold">
                {questions.filter((q) => q.isCorrect).length}/{questions.length}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow border px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors ${
              q.isCorrect
                ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700"
                : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-700 dark:text-gray-200">
                  Number {q.questionNumber}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Your Answer:
                  </span>
                  <span
                    className={`ml-2 inline-block px-2 py-1 rounded font-semibold text-sm
        ${
          q.isCorrect
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
        }`}
                  >
                    {q.playerAnswer}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Correct Answer(s):
                  </span>
                  <span className="ml-2 inline-block px-2 py-1 rounded font-semibold text-sm bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                    {q.correctAnswers.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {q.isCorrect ? (
                <span className="inline-flex items-center px-3 py-1 text-sm font-bold text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded-full">
                  ✔ Correct
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 text-sm font-bold text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded-full">
                  ✘ Incorrect
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <BackButton to={`/games/${gameId}/sessions`} target="sessions" />
    </div>
  );
}

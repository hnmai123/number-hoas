"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Rule {
  id: string;
  divisibleNumber: number;
  replacedWord: string;
}

interface Game {
  gameId: string;
  gameName: string;
  authorName: string;
  range: number;
  timeLimit: number;
  createdAt: string; // ISO date string
}

interface Session {
  sessionId: string;
  gameId: string;
  playerName: string;
  score: number;
  startTime: string;
  endTime: string;
}

export default function SessionsClient() {
  const { gameId } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [rules, setRules] = useState<Rule[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPlaying = searchParams.get("isPlaying");
  const sessionId = searchParams.get("sessionId");
  const apiUrl =
    process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
  // Fetch game info and rules
  useEffect(() => {
    if (!gameId) return;
    async function fetchGame() {
      try {
        const gameResponse = await fetch(`${apiUrl}/api/games/${gameId}`);
        const rulesResponse = await fetch(
          `${apiUrl}/api/games/${gameId}/rules`
        );
        if (!gameResponse.ok || !rulesResponse.ok) {
          throw new Error("Failed to fetch game and rules");
        }
        const gameData = await gameResponse.json();
        const rulesData = await rulesResponse.json();
        setGame(gameData);
        setRules(rulesData);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    }
    fetchGame();
  }, [gameId]);
  console.log(rules);

  // Fetch sessions
  useEffect(() => {
    if (!gameId) return;
    async function fetchSessions() {
      try {
        const response = await fetch(`${apiUrl}/api/games/${gameId}/sessions`);
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]);
      }
    }
    fetchSessions();
  }, [gameId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle play button
  const handlePlay = async () => {
    if (!playerName) return;
    const res = await fetch(`${apiUrl}/api/games/${gameId}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName }),
    });
    if (res.ok) {
      const newSession = await res.json();
      setSessions((prev) => [newSession, ...prev]);
      setPlayerName("");
      // Redirect to play screen with ?isPlaying=true and sessionId
      router.push(
        `/games/${gameId}/sessions?isPlaying=true&sessionId=${newSession.sessionId}`
      );
    }
  };

  if (isPlaying && sessionId) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            Playing Session
          </h2>
          <p className="mb-2">Session ID: {sessionId}</p>
          {/* Add your play screen UI here */}
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => {
              router.push(`/games/${gameId}/sessions`);
            }}
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white py-8 px-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
            Game Sessions
          </h1>
          <p className="text-lg font-medium text-blue-100">
            Play, compete, and review your session history for{" "}
            <span className="font-bold">
              {game?.gameName ?? `Game ${gameId}`}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
        <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-2xl p-6 mb-8 overflow-hidden">
          <div className="px-3">
            <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-200 mb-1 tracking-tight">
              {game?.gameName ?? `Game ${gameId}`}
            </h1>
            <div className="flex flex-wrap gap-4 mb-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-semibold">
                <svg
                  className="w-4 h-4 mr-1 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" />
                </svg>
                Author: {game?.authorName}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-sm font-semibold">
                <svg
                  className="w-4 h-4 mr-1 text-  green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a1 1 0 000 2h1v10H4a1 1 0 100 2h12a1 1 0 100-2h-1V5h1a1 1 0 100-2H4zm3 2v10h6V5H7z" />
                </svg>
                Range: {game?.range}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm font-semibold">
                <svg
                  className="w-4 h-4 mr-1 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" />
                </svg>
                Time Limit: {game?.timeLimit} seconds
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.length ? (
            rules.map((rule, idx) => {
              // If odd number of rules and this is the last card, span 2 columns
              const isLastOdd =
                rules.length % 2 === 1 && idx === rules.length - 1;
              return (
                <div
                  key={idx}
                  className={`bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow flex flex-col items-center ${
                    isLastOdd ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">
                    Divisible by {rule.divisibleNumber}
                  </div>
                  <div className="text-xl text-blue-900 dark:text-blue-100 font-semibold">
                    {rule.replacedWord}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-gray-500 dark:text-gray-400">
              No rules found.
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handlePlay}
            disabled={!playerName}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg disabled:bg-gray-400 transition"
          >
            Play
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Sessions
        </h2>
        {sessions.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">
            No sessions found.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">
                  Player
                </th>
                <th className="px-4 py-2 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">
                  Score
                </th>
                <th className="px-4 py-2 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">
                  Time
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.map((session) => (
                <tr key={session.sessionId}>
                  <td className="px-4 py-2 font-medium text-blue-700 dark:text-blue-300">
                    {session.playerName}
                  </td>
                  <td className="px-4 py-2 text-center">{session.score}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(new Date(session.endTime).toLocaleString())}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        window.location.href = `/games/${session.gameId}/sessions/${session.sessionId}`;
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

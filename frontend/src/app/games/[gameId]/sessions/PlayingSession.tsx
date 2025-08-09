"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Game, Rule } from "@/utils/types";
import GameRulesGrid from "@/components/GameRulesGrid";
import GameInfoHeader from "@/components/GameInfoHeader";
import GameStatsCard from "@/components/GameStatsCard";

interface PlayingSessionProps {
  sessionId: string;
  gameId: string | string[] | undefined;
}

interface GameStats {
  correct: number;
  incorrect: number;
  total: number;
}

export default function PlayingSession({
  sessionId,
  gameId,
}: PlayingSessionProps) {
  const router = useRouter();
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.INTERNAL_API_URL ||
    "http://localhost:5086";

  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Default time limit in seconds
  const [gameStats, setGameStats] = useState<GameStats>({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [gameOver, setGameOver] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        setTimeLeft(gameData.timeLimit ?? 0);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    }
    fetchGame();
  }, [gameId]);

  // Start game
  const startGame = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameActive(true);
    setGameStats({ correct: 0, incorrect: 0, total: 0 });
    setGameOver(false);
    setTimeLeft(game?.timeLimit ?? 60);

    await fetchRandomNumber();

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // End game
  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameActive(false);
    setGameOver(true);
    setRandomNumber(null);
  };
  // Set score after game ends
  useEffect(() => {
    if (gameOver && gameId && sessionId) {
      const saveScore = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/api/games/${gameId}/sessions/${sessionId}/score`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                score:
                  gameStats.total === 0
                    ? "0%"
                    : `${Math.round(
                        (gameStats.correct / gameStats.total) * 100
                      )}%`,
              }),
            }
          );
          if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(errMsg || "Failed to save score");
          }
          const result = await response.json();
          console.log("Score saved:", result);
        } catch (err: any) {
          setError(err.message || "Unknown error");
        }
      };
      saveScore();
    }
  }, [gameOver, gameId, sessionId, gameStats]);

  // Fetch random number from server
  const fetchRandomNumber = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${apiUrl}/api/games/${gameId}/sessions/${sessionId}/random-number`
      );
      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to fetch random number");
      }
      const data = await response.json();
      setRandomNumber(data.questionNumber);
      setQuestionId(data.questionId);
      setPlayerAnswer("");
      if (inputRef.current) inputRef.current.focus();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Submit player answer
  const submitAnswer = async () => {
    if (!randomNumber) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/api/games/${gameId}/sessions/${sessionId}/questions/${questionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerAnswer: playerAnswer.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to submit answer");
      }

      const result = await response.json();
      console.log(result);

      // Update stats
      setGameStats((prev) => ({
        ...prev,
        correct: result.isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: !result.isCorrect ? prev.incorrect + 1 : prev.incorrect,
        total: prev.total + 1,
      }));

      // Get next number
      await fetchRandomNumber();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const reviewGame = () => {}

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          {gameActive && (
            <div className="text-xl font-semibold">
              Time left:{" "}
              <span
                className={`${
                  timeLeft <= 10 ? "text-red-600" : "text-green-600"
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          )}
        </div>

        {!gameActive && !gameOver && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <GameInfoHeader game={game} gameId={gameId} />
            <GameRulesGrid rules={rules} />

            <p className="text-lg mb-6 text-center">
              Ready to play? The game will start when you click the button
              below.
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg mx-auto block transition-colors duration-300 ease-in-out"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}

        {gameActive && randomNumber !== null && (
          <div className="flex flex-col items-center my-6">
            <GameRulesGrid rules={rules} />
            <div className="mb-6 text-5xl font-bold text-blue-700 dark:text-blue-200">
              {randomNumber}
            </div>

            <div className="w-full max-w-md mb-6">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={playerAnswer}
                  onChange={(e) => setPlayerAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                  className="flex-grow border border-blue-300 dark:border-blue-600 px-5 py-3 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                  placeholder="Type your answer or submit"
                  disabled={loading}
                  autoComplete="off"
                />
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-7 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  onClick={submitAnswer}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
            <GameStatsCard
              correct={gameStats.correct}
              incorrect={gameStats.incorrect}
              total={gameStats.total}
            />
          </div>
        )}

        {gameOver && (
          <div className="my-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-center mb-6">Game Over! Your Score: {Math.round(gameStats.correct/gameStats.total * 100)}%</h3>

            <GameStatsCard
              correct={gameStats.correct}
              incorrect={gameStats.incorrect}
              total={gameStats.total}
            />

            <div className="flex justify-center mt-6">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold mr-4"
                onClick={startGame}
              >
                Play Again
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-semibold mr-4"
                onClick={reviewGame}
              >
                Review
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
            {error}
          </div>
        )}

        <button
          className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          onClick={() => {
            if (
              gameActive &&
              !confirm("Are you sure you want to leave the game?")
            ) {
              return;
            }
            window.location.href = `/games/${gameId}/sessions`;
          }}
        >
          Back to Sessions
        </button>
      </div>
    </div>
  );
}

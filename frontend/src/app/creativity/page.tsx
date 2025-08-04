"use client";

import NumberRangeInput from "@/components/NumberRange";
import RuleForm from "@/components/RuleForm";
import TextInput from "@/components/TextInput";
import TimeLimitInput from "@/components/TimeLimit";
import { faGamepad, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Rule {
  id: string;
  gameId: string;
  divisibleNumber: number;
  replacedWord: string;
  createdAt?: string;
}

interface GameData {
  id: string;
  name: string;
  authorName: string;
  range: number;
  timeLimit: number;
  rules: Rule[];
  createdAt?: string;
}

export default function CreateGame() {
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState<GameData>({
    id: crypto.randomUUID(), // generates a valid GUID
    name: "",
    authorName: "",
    range: 100,
    timeLimit: 60,
    rules: [],
  });
const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;

  const saveGame = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/games`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: gameData.id,
            gameName: gameData.name,
            authorName: gameData.authorName,
            range: gameData.range,
            timeLimit: gameData.timeLimit,
            createdAt: new Date().toISOString(),
          }),
        }
      );
      if (response.ok) {
        const savedGame = await response.json();

        for (const rule of gameData.rules) {
          await fetch(
            `${apiUrl}/api/games/${savedGame.gameId}/rules`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...rule,
                gameId: savedGame.gameId,
              }),
            }
          );
          const testrule = { ...rule, gameId: savedGame.gameId };
          console.log("Saved rule:", testrule);
        }
        setGameData({
          id: crypto.randomUUID(),
          name: "",
          authorName: "",
          range: 100,
          timeLimit: 60,
          rules: [],
        });
      }
    } catch (error) {
      console.error("Error saving game:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 Create Number-Word Game
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 italic">
          Create your own FizzBuzz-style game! Define rules where numbers become
          words.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faGamepad} className="text-blue-500" />
            Game Settings
          </h2>

          <div className="space-y-4">
            {/* Game Name Filed */}
            <TextInput
              label="Game Name"
              placeholder="Super FizzBuzz Challenge"
              value={gameData.name}
              onChange={(val) => setGameData({ ...gameData, name: val })}
            />

            {/* Author Name Field */}
            <TextInput
              label="Author Name"
              placeholder="Chicken Guy"
              value={gameData.authorName}
              onChange={(val) => setGameData({ ...gameData, authorName: val })}
            />

            {/* Number Range Field */}
            <NumberRangeInput
              value={gameData.range}
              onChange={(val) => setGameData({ ...gameData, range: val })}
            />

            {/* Time Limit Field */}
            <TimeLimitInput
              value={gameData.timeLimit}
              onChange={(val) => setGameData({ ...gameData, timeLimit: val })}
            />

            {/* Rules Section */}
            <RuleForm
              rules={gameData.rules ?? []}
              onAdd={(divisibleNumber, replacedWord) => {
                const tempId = crypto.randomUUID();
                setGameData({
                  ...gameData,
                  rules: [
                    ...gameData.rules,
                    {
                      id: tempId,
                      divisibleNumber,
                      replacedWord,
                      gameId: gameData.id,
                    },
                  ],
                });
              }}
              onRemove={(id) => {
                setGameData({
                  ...gameData,
                  rules: gameData.rules.filter((rule) => rule.id !== id),
                });
              }}
            />
            {/* Submit games */}
            <button
              onClick={saveGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
              disabled={
                loading ||
                !gameData.name ||
                !gameData.authorName ||
                gameData.range < 1 ||
                gameData.timeLimit < 1 ||
                gameData.rules.length < 1
              }
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Saving..." : "Save Game"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

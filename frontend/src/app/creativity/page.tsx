"use client";

import TimeLimitInput from "@/components/TimeLimit";
import { faGamepad, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse } from "path";
import { useState } from "react";

// Game
// UUID gameId
// string gameName
// string authorName
// int range
// int timeLimit
// datetime created_at

// Rule
// UUID ruleId
// UUID gameId
// int divisibleNumber
// string replacedWord
// datetime created_at

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
  const [gameData, setGameData] = useState<GameData>({
    id: "1",
    name: "",
    authorName: "",
    range: 100,
    timeLimit: 60,
    rules: [
      { id: "1", gameId: "1", divisibleNumber: 3, replacedWord: "Fizz" },
      { id: "2", gameId: "1", divisibleNumber: 5, replacedWord: "Buzz" },
    ],
  });

  const [newRule, setNewRule] = useState<Rule>({
    id: "",
    gameId: gameData.id,
    divisibleNumber: 0,
    replacedWord: "",
  });

  const addRule = () => {
    if (newRule.divisibleNumber > 0 && newRule.replacedWord) {
      const tempId = `temp_${Date.now()}`;
      const updatedRules = [...gameData.rules, { ...newRule, id: tempId }];
      setGameData({ ...gameData, rules: updatedRules });
      setNewRule({
        id: "",
        gameId: gameData.id,
        divisibleNumber: 0,
        replacedWord: "",
      });
    }
  };

  const removeRule = (ruleId: string) => {
    const updatedRules = gameData.rules.filter((rule) => rule.id !== ruleId);
    setGameData({ ...gameData, rules: updatedRules });
  };

  const updateRule = (ruleId: string, updatedRule: Partial<Rule>) => {
    const updatedRules = gameData.rules.map((rule) =>
      rule.id === ruleId ? { ...rule, ...updatedRule } : rule
    );
    setGameData({ ...gameData, rules: updatedRules });
  };

  const saveGame = async () => {
    try {
      const response = await fetch("api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: gameData.name,
          authorName: gameData.authorName,
          range: gameData.range,
          timeLimit: gameData.timeLimit,
          rules: gameData.rules.map((rule) => ({
            divisibleNumber: rule.divisibleNumber,
            replacedWord: rule.replacedWord,
          })),
        }),
      });
      if (response.ok) {
        const savedGame = await response.json();
        console.log("Game saved successfully:", savedGame);
        setGameData(savedGame);
      }
    } catch (error) {
      console.error("Error saving game:", error);
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Game Name
              </label>
              <input
                type="text"
                value={gameData.name}
                onChange={(e) =>
                  setGameData({ ...gameData, name: e.target.value })
                }
                placeholder="Super FizzBuzz Challenge"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Author Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={gameData.authorName}
                onChange={(e) =>
                  setGameData({ ...gameData, authorName: e.target.value })
                }
                placeholder="Chicken Guy"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Number Range Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number Range: 1 - {gameData.range}
                </label>
                {/* Input number */}
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={gameData.range}
                  onChange={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      setGameData({
                        ...gameData,
                        range: 1,
                      });
                      return;
                    } else if (parseInt(e.target.value) < 1) {
                      setGameData({
                        ...gameData,
                        range: 1,
                      });
                      return;
                    } else if (parseInt(e.target.value) > 1000) {
                      setGameData({
                        ...gameData,
                        range: 1000,
                      });
                      return;
                    } else {
                      setGameData({
                        ...gameData,
                        range: parseInt(e.target.value),
                      });
                    }
                  }}
                  className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
              </div>

              {/* Range slider */}
              <input
                type="range"
                min="1"
                max="1000"
                value={gameData.range}
                onChange={(e) =>
                  setGameData({ ...gameData, range: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Players will see numbers from 1 to {gameData.range}
              </div>
            </div>
            {/* Time Limit Field */}
            <TimeLimitInput
              value={gameData.timeLimit}
              onChange={(val) => setGameData({ ...gameData, timeLimit: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

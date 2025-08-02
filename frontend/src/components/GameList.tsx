"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faGamepad,
  faClock,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Game {
  gameId: string;
  gameName: string;
  authorName: string;
  range: number;
  timeLimit: number;
  createdAt: string; // ISO date string
}

interface GameListProps {
  games?: Game[];
  onPlayGame?: (gameId: string) => void;
}

export default function GameList({ games = [], onPlayGame }: GameListProps) {
  const [displayGames, setDisplayGames] = useState<Game[]>([]);
  const router = useRouter();
  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:5086/api/games");
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

  useEffect(() => {
    async function loadGames() {
      const gamesData = await fetchGames();
      setDisplayGames(gamesData);
    }
    loadGames();
  }, []);

  const handlePlayClick = (gameId: string) => {
    if (onPlayGame) {
      onPlayGame(gameId);
    } else {
      router.push(`/games/${gameId}/sessions`);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(" ");
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faGamepad} className="text-blue-500" />
        Available Games
      </h2>
      {displayGames.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No games available at the moment.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 font-bold">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>

                  <th className="px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Time Limit
                  </th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Highest Score
                  </th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayGames.map((game) => (
                  <tr
                    key={game.gameId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {game.gameName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {game.authorName}
                      </div>
                    </td>
                    {/* Time Limit cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 justify-center">
                        <FontAwesomeIcon icon={faClock} className="text-xs" />
                        {formatTime(game.timeLimit)}
                      </div>
                    </td>
                    {/* Score cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 justify-center">
                        -
                      </div>
                    </td>
                    {/* Action cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handlePlayClick(game.gameId)}
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                          <FontAwesomeIcon icon={faPlay} />
                          Play
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

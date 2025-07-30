"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faGamepad,
  faClock,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

// UUID gameId
// string gameName
// string authorName
// int range
// int timeLimit
// datetime created_at

interface Game {
  id: string;
  name: string;
  author: string;
  range: number;
  timeLimit: number;
  createdAt: string; // ISO date string
}

interface GameListProps {
  games?: Game[];
  onPlayGame?: (gameId: string) => void;
}

export default function GameList({ games = [], onPlayGame }: GameListProps) {
  const sampleGames: Game[] = [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Number Rush Challenge",
      author: "John Smith",
      range: 100,
      timeLimit: 60,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      name: "Math Blitz Pro",
      author: "Sarah Johnson",
      range: 500,
      timeLimit: 120,
      createdAt: "2024-01-14T14:45:00Z",
    },
    {
      id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      name: "Quick Calc",
      author: "Mike Chen",
      range: 50,
      timeLimit: 30,
      createdAt: "2024-01-13T09:15:00Z",
    },
    {
      id: "d4e5f6g7-h8i9-0123-defg-456789012345",
      name: "Number Mastery",
      author: "Emma Wilson",
      range: 1000,
      timeLimit: 180,
      createdAt: "2024-01-12T16:20:00Z",
    },
    {
      id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
      name: "Speed Digits",
      author: "Alex Rodriguez",
      range: 200,
      timeLimit: 45,
      createdAt: "2024-01-11T11:00:00Z",
    },
  ];

  const displayGames = games.length > 0 ? games : sampleGames;

  const handlePlayClick = (gameId: string) => {
    if (onPlayGame) {
      onPlayGame(gameId);
    } else {
      console.log(`Playing game with ID: ${gameId}`);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faGamepad} className="text-blue-500" />
        Available Games
      </h2>

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
                  key={game.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {game.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {game.author}
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
                        onClick={() => handlePlayClick(game.id)}
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

      {displayGames.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No games available at the moment.
        </div>
      )}
    </div>
  );
}

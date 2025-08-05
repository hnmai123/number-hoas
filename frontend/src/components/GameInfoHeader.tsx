import { Game } from "@/types/types";

interface GameInfoHeaderProps {
  game: Game | null;
  gameId: string | string[] | undefined;
}

export default function GameInfoHeader({ game, gameId }: GameInfoHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-2xl p-6 mb-8 overflow-hidden">
      <div className="px-3">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-200 mb-1 tracking-tight">
          {game?.gameName ?? `Game ${gameId}`}
        </h1>
        <div className="flex flex-wrap gap-4 mb-2 mt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-semibold">
            Author: {game?.authorName}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-sm font-semibold">
            Range: {game?.range}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm font-semibold">
            Time Limit: {game?.timeLimit} seconds
          </span>
        </div>
      </div>
    </div>
  );
}

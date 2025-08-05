interface GameStatsCardProps {
  correct: number;
  incorrect: number;
  total: number;
  size?: "sm" | "lg";
}

export default function GameStatsCard({
  correct,
  incorrect,
  total,
  size = "lg",
}: GameStatsCardProps) {
  const cardClass =
    size === "sm" ? "p-3 text-sm min-w-[70px]" : "p-4 text-lg min-w-[90px]";
  const valueClass = size === "sm" ? "text-xl font-bold" : "text-2xl font-bold";
  return (
    <div className="flex gap-4 justify-center">
      <div
        className={`${cardClass} bg-green-100 dark:bg-green-900 rounded-lg text-center`}
      >
        <div className="text-green-700 dark:text-green-200 font-semibold">
          Correct
        </div>
        <div className={`${valueClass} text-green-600 dark:text-green-400`}>
          {correct}
        </div>
      </div>
      <div
        className={`${cardClass} bg-red-100 dark:bg-red-900 rounded-lg text-center`}
      >
        <div className="text-red-700 dark:text-red-200 font-semibold">
          Incorrect
        </div>
        <div className={`${valueClass} text-red-600 dark:text-red-400`}>
          {incorrect}
        </div>
      </div>
      <div
        className={`${cardClass} bg-blue-100 dark:bg-blue-900 rounded-lg text-center`}
      >
        <div className="text-blue-700 dark:text-blue-200 font-semibold">
          Total
        </div>
        <div className={`${valueClass} text-blue-600 dark:text-blue-400`}>
          {total}
        </div>
      </div>
    </div>
  );
}

import { Rule } from "@/types/types";

interface GameRulesGridProps {
  rules: Rule[];
  onRemoveRule?: (id: string) => void;
}
export default function GameRulesGrid({
  rules,
  onRemoveRule,
}: GameRulesGridProps) {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rules.length ? (
        rules.map((rule, idx) => {
          const isLastOdd = rules.length % 2 === 1 && idx === rules.length - 1;
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
              {onRemoveRule && (
                <button
                  className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded text-sm"
                  onClick={() => onRemoveRule(rule.ruleId)}
                  type="button"
                >
                  Remove
                </button>
              )}
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-gray-500 dark:text-gray-400">
          No rules found.
        </div>
      )}
    </div>
  );
}

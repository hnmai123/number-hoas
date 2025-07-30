import { useState } from "react";

interface RuleFormProps {
  onAdd: (divisibleNumber: number, replacedWord: string) => void;
}

export default function RuleForm({ onAdd }: RuleFormProps) {
  const [divisibleNumber, setDivisibleNumber] = useState<number>(0);
  const [replacedWord, setReplacedWord] = useState<string>("");
  const [rules, setRules] = useState<
    { id: string; divisibleNumber: number; replacedWord: string }[]
  >([]);
  const handleAdd = () => {
    if (divisibleNumber > 0 && replacedWord) {
      const newRule = {
        id: `rule_${Date.now()}`,
        divisibleNumber,
        replacedWord,
      };
      setRules([...rules, newRule]);
      onAdd(divisibleNumber, replacedWord);
      setDivisibleNumber(0);
      setReplacedWord("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Add Rule
      </label>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min={1}
          value={divisibleNumber || 0}
          onChange={(e) => setDivisibleNumber(parseInt(e.target.value) || 0)}
          placeholder="Divisible by"
          className="w-32 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          value={replacedWord}
          onChange={(e) => setReplacedWord(e.target.value)}
          placeholder="Replace with word"
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleAdd}
          disabled={divisibleNumber < 1 || !replacedWord}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
          >
            <span>
              Divisible by {rule.divisibleNumber} → {rule.replacedWord}
            </span>
            <button
              onClick={() => setRules(rules.filter((r) => r.id !== rule.id))}
              className="text-red-600 hover:text-red-800 bg-transparent hover:bg-red-100 dark:hover:bg-red-700 px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

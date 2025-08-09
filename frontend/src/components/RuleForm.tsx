import { Rule } from "@/utils/types";
import { useState } from "react";
import GameRulesGrid from "./GameRulesGrid";



interface RuleFormProps {
  rules: Rule[];
  onAdd: (divisibleNumber: number, replacedWord: string) => void;
  onRemove: (id: string) => void;
}

export default function RuleForm({ rules = [], onAdd, onRemove }: RuleFormProps) {
  const [divisibleNumber, setDivisibleNumber] = useState<number>(0);
  const [replacedWord, setReplacedWord] = useState<string>("");

  const handleAdd = () => {
    if (divisibleNumber > 0 && replacedWord) {
      onAdd(divisibleNumber, replacedWord);
      setDivisibleNumber(0);
      setReplacedWord("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Game Rules
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
      <GameRulesGrid rules={rules} onRemoveRule={onRemove} />
    </div>
  );
}

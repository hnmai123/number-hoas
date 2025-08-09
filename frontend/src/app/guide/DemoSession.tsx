"use client";

import { useState } from "react";
import { Rule } from "@/utils/types";
import GameRulesGrid from "@/components/GameRulesGrid";
import GameStatsCard from "@/components/GameStatsCard";

const DEMO_RULES: Rule[] = [
  { gameId: "1", ruleId: "1", divisibleNumber: 3, replacedWord: "Fizz" },
  { gameId: "1", ruleId: "2", divisibleNumber: 5, replacedWord: "Buzz" },
  { gameId: "1", ruleId: "3", divisibleNumber: 4, replacedWord: "Foo" },
];

const DEMO_NUMBERS = [15, 12, 9, 7, 20, 30];

function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
    d++;
    if (d * d > n && n > 1) {
      factors.push(n);
      break;
    }
  }
  return factors;
}

function getDemoAnswers(n: number, rules: Rule[]): string[] {
  // Count prime factors
  const factors = getPrimeFactors(n);
  const factorCounter: Record<number, number> = {};
  for (const f of factors) {
    factorCounter[f] = (factorCounter[f] || 0) + 1;
  }

  // Convert rule to its own prime factor counter
  function ruleToCounter(rule: Rule) {
    const ruleFactors = getPrimeFactors(rule.divisibleNumber);
    const counter: Record<number, number> = {};
    for (const f of ruleFactors) {
      counter[f] = (counter[f] || 0) + 1;
    }
    return counter;
  }
  const ruleCounters = rules.map(ruleToCounter);

  // Check if a rule can apply to the current factors
  function canApply(
    factors: Record<number, number>,
    ruleCounter: Record<number, number>
  ) {
    for (const k in ruleCounter) {
      if (!factors[k] || factors[k] < ruleCounter[k]) return false;
    }
    return true;
  }

  // Subtract rule_counter from current factors
  function applyRule(
    factors: Record<number, number>,
    ruleCounter: Record<number, number>
  ) {
    const newFactors = { ...factors };
    for (const k in ruleCounter) {
      newFactors[k] -= ruleCounter[k];
      if (newFactors[k] === 0) delete newFactors[k];
    }
    return newFactors;
  }

  // DFS to find valid replacements
  function dfs(factors: Record<number, number>, path: string[]): string[] {
    if (Object.values(factors).reduce((a, b) => a + b, 0) === 0) {
      return [path.join("")];
    }
    let results: string[] = [];
    for (let i = 0; i < rules.length; i++) {
      if (canApply(factors, ruleCounters[i])) {
        const newFactors = applyRule(factors, ruleCounters[i]);
        results = results.concat(
          dfs(newFactors, [...path, rules[i].replacedWord])
        );
      }
    }
    return results;
  }

  const outputs = dfs(factorCounter, []);
  return outputs.length > 0 ? outputs : ["Prime"];
}

export default function DemoSession() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  const number = DEMO_NUMBERS[step];
  const answers = getDemoAnswers(number, DEMO_RULES);
  const answerDisplay = answers.join(", ");

  const handleSubmit = () => {
    const isCorrect = answers.some(
      (ans) => input.trim().toLowerCase() === ans.toLowerCase()
    );
    setResult(isCorrect);
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    setResult(null);
    setInput("");
    setStep((prev) => (prev + 1) % DEMO_NUMBERS.length);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-blue-100 dark:border-blue-900 p-8 mb-8 transition hover:shadow-blue-200 dark:hover:shadow-blue-900 hover:scale-[1.01] duration-200">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Demo Session
          </h2>
          <GameRulesGrid rules={DEMO_RULES} />
          <div className="mb-6 text-5xl font-extrabold text-blue-700 dark:text-blue-200 mt-6 select-none">
            {number}
          </div>
          <div className="w-full max-w-md mb-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="flex-grow border border-blue-300 dark:border-blue-600 px-5 py-3 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                placeholder="Type your answer or Prime"
                disabled={result !== null}
                autoComplete="off"
              />
              <button
                className="w-32 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-7 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed mt-0"
                onClick={result !== null ? handleNext : handleSubmit}
                disabled={false}
              >
                {result !== null ? "Next" : "Submit"}
              </button>
            </div>
          </div>
          {result !== null && (
            <div
              className={`mb-4 text-lg font-semibold ${
                result ? "text-green-600" : "text-red-600"
              }`}
            >
              {result ? (
                "Correct!"
              ) : (
                <div className="text-center">
                  Incorrect
                  <br />
                  <span className="text-gray-700 dark:text-gray-200">
                    Answer{answers.length > 0 ? "s: " : ":"}
                  </span>
                  <span className="font-bold text-blue-700 dark:text-blue-200">
                    {answerDisplay}
                  </span>
                </div>
              )}
            </div>
          )}
          <GameStatsCard
            correct={stats.correct}
            incorrect={stats.incorrect}
            total={stats.total}
          />
        </div>
      </div>
    </div>
  );
}

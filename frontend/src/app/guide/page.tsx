"use client";
import BackButton from "@/components/BackButton";
import DemoSession from "./DemoSession";

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-8 text-center drop-shadow">
        How to Play Number Hoas
      </h1>

      {/* Game Rules */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-10 border border-blue-100 dark:border-blue-900 transition hover:shadow-blue-200 dark:hover:shadow-blue-900 hover:scale-[1.01] duration-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-200 flex items-center gap-2">
          <span>🧩</span> Game Rules
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-lg text-gray-800 dark:text-gray-100">
          <li>
            Each round, you’ll see a{" "}
            <span className="font-semibold text-blue-600">random number</span>{" "}
            and a set of{" "}
            <span className="font-semibold text-blue-600">rules</span>.
          </li>
          <li>
            Each rule has a{" "}
            <span className="font-semibold">divisible number</span> and a{" "}
            <span className="font-semibold">replacement word</span> (e.g.{" "}
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition">
              3: Fizz
            </span>
            )
          </li>
          <li>
            To answer, replace the number with a combination of replacement
            words according to its{" "}
            <span className="font-semibold">prime factors</span>.
          </li>
          <li>
            If multiple rules apply, combine their words in any valid order.
          </li>
          <li>
            If the number is <span className="font-semibold">prime</span> or no
            rules apply, answer{" "}
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition">
              Prime
            </span>
          </li>
        </ol>
      </div>

      {/* Examples */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-3xl shadow-lg p-8 mb-10 border border-blue-100 dark:border-blue-900 transition hover:shadow-blue-200 dark:hover:shadow-blue-900 hover:scale-[1.01] duration-200">
        <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <span>💡</span> Examples
        </h2>
        <div className="space-y-4 text-base">
          <div>
            <span className="font-semibold">Rules:</span>{" "}
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition cursor-pointer">
              3: Fizz
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition ml-2 cursor-pointer">
              5: Buzz
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition ml-2 cursor-pointer">
              4: Foo
            </span>
          </div>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <span className="font-semibold">15</span> = 3 × 5 →{" "}
              <span className="text-blue-700 dark:text-blue-200 font-bold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow">
                FizzBuzz
              </span>
            </li>
            <li>
              <span className="font-semibold">12</span> = 2 × 2 × 3 →{" "}
              <span className="text-blue-700 dark:text-blue-200 font-bold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow">
                FooFizz
              </span>
            </li>
            <li>
              <span className="font-semibold">9</span> = 3 × 3 →{" "}
              <span className="text-blue-700 dark:text-blue-200 font-bold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow">
                FizzFizz
              </span>
            </li>
            <li>
              <span className="font-semibold">7</span> is prime →{" "}
              <span className="text-blue-700 dark:text-blue-200 font-bold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow">
                Prime
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-blue-100 dark:border-blue-900 transition hover:shadow-blue-200 dark:hover:shadow-blue-900 hover:scale-[1.01] duration-200">
        <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-200 flex items-center gap-2">
          <span>📝</span> Tips
        </h2>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800 dark:text-gray-100">
          <li>
            <span className="font-semibold text-blue-600">Factorize</span> the
            number into primes first.
          </li>
          <li>Apply rules as many times as their factors appear.</li>
          <li>Try all possible combinations if there are multiple rules.</li>
          <li>
            Don’t forget: If no rule applies, answer{" "}
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition">
              Prime
            </span>
          </li>
        </ul>
      </div>

      {/* Demo Session */}
      <div className="mt-10">
        <DemoSession />
      </div>
      
      <BackButton />
    </div>
  );
}

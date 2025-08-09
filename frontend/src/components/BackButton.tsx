"use client";
import { useRouter } from "next/navigation";

export default function BackButton({
  to = "/",
  target = "homepage",
}: {
  to?: string;
  target?: string;
}) {
  const router = useRouter();
  return (
    <div className="w-full max-w-xl mx-auto flex justify-center mt-5 mb-0">
      <button
        onClick={() => router.push(to)}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to {target}
      </button>
    </div>
  );
}
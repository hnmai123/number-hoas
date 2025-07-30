import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../lib/fontawesome.config";
import ThemeToggle from "../components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faPalette,
  faComments,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Number Hoas",
  description: "A game for number enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-300">
          <a
            href="/"
            className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Number Hoas
          </a>
          <nav className="flex space-x-8 items-center">
            <a
              href="/leaderboard"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-gray-700 dark:text-gray-300"
              />
              Leaderboard
            </a>
            <a
              href="/creativity"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faPalette}
                className="text-gray-700 dark:text-gray-300"
              />
              Creativity
            </a>
            <a
              href="/feedback"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faComments}
                className="text-gray-700 dark:text-gray-300"
              />
              Feedback
            </a>
            <ThemeToggle />
          </nav>
        </header>
        <main className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {children}
        </main>
        <footer className="mt-auto py-6 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <FontAwesomeIcon
            icon={faCopyright}
            className="mr-1 text-gray-600 dark:text-gray-400"
          />
          <span className="text-gray-600 dark:text-gray-400">
             2025 Huy Mai - Number Hoas
          </span>
        </footer>
      </body>
    </html>
  );
}

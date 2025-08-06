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
import NavLink from "@/components/NavLink";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-300">
          <a
            href="/"
            className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Number Hoas
          </a>
          <nav className="flex space-x-8 items-center">
            <NavLink href="/leaderboard" icon={faChartLine}>
              Leaderboard
            </NavLink>
            <NavLink href="/creativity" icon={faPalette}>
              Creativity
            </NavLink>
            <NavLink href="/feedback" icon={faComments}>
              Feedback
            </NavLink>
            <ThemeToggle />
          </nav>
        </header>
        <main className="flex-1 bg-inherit text-inherit transition-colors duration-300">
          {children}
        </main>
        <footer className="mt-auto py-6 text-center border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
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

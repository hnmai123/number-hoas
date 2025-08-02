import GameList from "@/components/GameList";

export default function GamePages() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Number Hoas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic">
          Challenge yourself with number-based games!
        </p>
      </div>
      <div className="mb-8">
        <div className="container mx-auto px-4 py-12">
          <GameList />
        </div>
      </div>
    </div>
  );
}

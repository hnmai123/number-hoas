import SessionsClient from "./SessionsClient";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:5086/api/games");
  const games = await response.json();

  return games.map((game: { gameId: string }) => ({
    gameId: game.gameId,
  }));
}

export default function SessionsPage() {
  return <SessionsClient />;
}

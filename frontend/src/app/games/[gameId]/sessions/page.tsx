import SessionsClient from "./SessionsClient";

export async function generateStaticParams() {
  const apiUrl =
    process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/games`);
  const games = await response.json();

  return games.map((game: { gameId: string }) => ({
    gameId: game.gameId,
  }));
}

export default function SessionsPage() {
  return <SessionsClient />;
}

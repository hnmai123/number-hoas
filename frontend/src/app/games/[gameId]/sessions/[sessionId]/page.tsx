import ReviewSession from "./ReviewSession";

type PageProps = {
  params: {
    gameId: string;
    sessionId: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <ReviewSession
      gameId={params.gameId}
      sessionId={params.sessionId}
    />
  );
}
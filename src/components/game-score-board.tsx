interface GameScoreBoardProps {
  tries: number;
  score: number;
}

export function GameScoreBoard({ tries, score }: GameScoreBoardProps) {
  return (
    <div className="my-4 w-full flex items-center justify-center gap-10 text-center">
      <p className="">
        Tentativas:{" "}
        <span className="font-semibold text-orange-600">{tries}</span>
      </p>
      <p className="">
        Pontos: <span className="font-semibold text-green-600">{score}</span>
      </p>
    </div>
  );
}

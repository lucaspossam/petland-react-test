import { GameScoreBoard } from "./components/game-score-board";
import Loading from "./components/loading";
import { usePlayingCardsGame } from "./hooks/use-playing-cards-game";
import { GameControls } from "./sections/game-controls";
import { Header } from "./sections/header";
import { PlayingCardsList } from "./sections/playing-cards-list";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export function App() {
  const { loadingCards, gameStage, tries, score } = usePlayingCardsGame();
  return (
    <div className="w-full h-svh flex flex-col items-center  gap-10 pt-10">
      <Header />
      <div
        className={`transition-all duration-200 ease-in-out transform ${
          !loadingCards
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {gameStage !== "start" && (
          <GameScoreBoard tries={tries} score={score} />
        )}
        <GameControls />
        <PlayingCardsList />
      </div>
      <div
        className={`transition-all duration-200 ease-in-out transform ${
          loadingCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Loading />
      </div>

      {gameStage === "completed" && <Fireworks autorun={{ speed: 3 }} />}
    </div>
  );
}

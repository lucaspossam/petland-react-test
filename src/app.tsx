import Loading from "./components/loading";
import { usePlayingCardsGame } from "./hooks/use-playing-cards-game";
import { GameControls } from "./sections/game-controls";
import { Header } from "./sections/header";
import { PlayingCardsList } from "./sections/playing-cards-list";

export function App() {
  const { loadingCards } = usePlayingCardsGame();
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
    </div>
  );
}

import { GameControls } from "./sections/game-controls";
import { Header } from "./sections/header";
import { PlayingCardsList } from "./sections/playing-cards-list";

export function App() {
  return (
    <div className="w-full h-svh flex flex-wrap items-start gap-10 pt-10">
      <Header />
      <GameControls />
      <PlayingCardsList />
    </div>
  );
}

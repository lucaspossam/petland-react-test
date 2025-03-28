import { useState } from "react";
import { usePlayingCardsGame } from "../hooks/use-playing-cards-game";
import { CardsQuantitySelect } from "../components/cards-quantity-select";
import { GameButton } from "../components/game-button";

export function GameControls() {
  const { startCardsGame, restartCardsGame, gameStage } = usePlayingCardsGame();
  const [pairs, setPairs] = useState<number>(16);
  return (
    <div className="w-full flex items-center justify-center h-fit ">
      {gameStage === "start" && (
        <div className="items-center justify-center flex flex-col">
          <CardsQuantitySelect pairs={pairs} setPairs={setPairs} />
          <GameButton onClick={() => startCardsGame(pairs)} text="Start Game" />
        </div>
      )}
      {gameStage === "playing" && (
        <GameButton onClick={restartCardsGame} text="Restart Game" />
      )}
    </div>
  );
}

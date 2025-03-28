import { PlayingCard } from "../components/playing-card";
import { usePlayingCardsGame } from "../hooks/use-playing-cards-game";

export function PlayingCardsList() {
  const { playingCards, selectedCards, correctPairs, gameStage } =
    usePlayingCardsGame();

  const checkTurned = (key: number) => {
    return (
      selectedCards.some(selected => selected.key === key) ||
      correctPairs.some(correct => correct.key === key)
    );
  };

  if (gameStage === "playing")
    return (
      <div className="w-full flex items-start justify-center flex-1 h-full px-4">
        <div className="w-[900px] min-w-[900px] flex flex-wrap justify-center gap-1">
          {playingCards.map((card, index) => (
            <PlayingCard
              key={index}
              card={{ ...card, key: index }}
              turned={checkTurned(index)}
            />
          ))}
        </div>
      </div>
    );
}

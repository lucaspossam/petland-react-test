import { Card } from "../contexts/playing-cards-context";
import { usePlayingCardsGame } from "../hooks/use-playing-cards-game";

const IMAGES_PATH = "img/cards";
const DEFAULT_IMG = "back-card-logo";
const IMAGES_TYPE = "png";

interface PlayingCard {
  card: Card;
  turned: boolean;
}

export function PlayingCard({ card, turned }: PlayingCard) {
  const { handleSelectCard } = usePlayingCardsGame();

  const handleClick = () => {
    if (!turned) {
      handleSelectCard(card);
    }
  };

  return (
    <div onClick={handleClick}>
      {turned ? (
        <img
          src={`${IMAGES_PATH}/${card.cardSticker}.${IMAGES_TYPE}`}
          className="w-[215px] flex-1 object-contain"
        />
      ) : (
        <img
          src={`${IMAGES_PATH}/${DEFAULT_IMG}.${IMAGES_TYPE}`}
          className="w-[215px] flex-1 object-contain"
        />
      )}
    </div>
  );
}

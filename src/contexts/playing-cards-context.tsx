import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { getPlayingCards } from "../services/playing-cards";

export interface Card {
  id: number;
  key?: number;
  card: string;
  sticker: string;
  cardSticker: string;
  selected?: boolean;
}

type GameStage = "start" | "playing" | "completed";

interface PlayingCardsContextType {
  gameStage: GameStage;
  playingCards: Card[];
  selectedCards: Card[];
  correctPairs: Card[];
  selectCard: (card: Card) => void;
  startCardsGame: (pairs: number) => void;
  removeSelection: () => void;
  updateCorrectPairs: (cards: Card[]) => void;
  restartCardsGame: () => void;
  playingCardTimer: RefObject<number | null>;
  loadingCards: boolean;
}

const PlayingCardsContext = createContext<PlayingCardsContextType | undefined>(
  undefined
);

export const PlayingCardsProvider = ({ children }: { children: ReactNode }) => {
  const [playingCards, setPlayingCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [correctPairs, setCorrectPairs] = useState<Card[]>([]);
  const [gameStage, setGameStage] = useState<GameStage>("start");
  const [loadingCards, setLoadingCards] = useState(false);

  const playingCardTimer = useRef<null | number>(null);

  const preparePlayingCards = (cards: Card[]) => {
    const doubledCards = [...cards, ...cards];

    for (let i = doubledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubledCards[i], doubledCards[j]] = [doubledCards[j], doubledCards[i]];
    }

    return doubledCards;
  };

  const startCardsGame = async (pairs: number) => {
    setLoadingCards(true);
    const cards = await getPlayingCards(pairs);
    if (!cards.error && cards.length) {
      const shuffledCards = preparePlayingCards(cards);
      setPlayingCards(shuffledCards);
      setCorrectPairs([]);
      setSelectedCards([]);
      setGameStage("playing");

      if (playingCardTimer.current) {
        clearTimeout(playingCardTimer.current);
      }
    }
    setLoadingCards(false);
  };

  const restartCardsGame = () => {
    setLoadingCards(true);
    setGameStage("start");
    setCorrectPairs([]);
    setSelectedCards([]);
    setPlayingCards([]);
    setTimeout(() => {
      setLoadingCards(false);
    }, 1000);
    if (playingCardTimer.current) {
      clearTimeout(playingCardTimer.current);
    }
  };

  const selectCard = (card: Card) => {
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { ...card, selected: true }]);
    }
  };

  const removeSelection = () => {
    setSelectedCards([]);
  };

  const updateCorrectPairs = (cards: Card[]) => {
    setCorrectPairs([...correctPairs, ...cards]);
  };

  return (
    <PlayingCardsContext.Provider
      value={{
        playingCards,
        selectedCards,
        correctPairs,
        selectCard,
        startCardsGame,
        removeSelection,
        updateCorrectPairs,
        playingCardTimer,
        gameStage,
        restartCardsGame,
        loadingCards,
      }}
    >
      {children}
    </PlayingCardsContext.Provider>
  );
};

export const usePlayingCards = () => {
  const context = useContext(PlayingCardsContext);
  if (!context) {
    throw new Error(
      "usePlayingCards must be used within a PlayingCardsProvider"
    );
  }
  return context;
};

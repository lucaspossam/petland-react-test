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
  restartCardsGame: () => void;
  playingCardTimer: RefObject<number | null>;
  loadingCards: boolean;
  tries: number;
  score: number;
  matchCards: () => void;
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
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
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
    setTries(0);
    setScore(0);
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
    setScore(score + 1);
    setCorrectPairs([...correctPairs, ...cards]);
  };

  const isCorrectPairs = () => {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    return card1.id === card2.id && card1.key !== card2.key;
  };

  const matchCards = () => {
    setTries(tries + 1);
    if (isCorrectPairs()) {
      updateCorrectPairs(selectedCards);
      removeSelection();
    } else {
      playingCardTimer.current = setTimeout(() => {
        removeSelection();
      }, 1000);
    }
  };

  return (
    <PlayingCardsContext.Provider
      value={{
        playingCards,
        selectedCards,
        correctPairs,
        selectCard,
        startCardsGame,
        playingCardTimer,
        gameStage,
        restartCardsGame,
        loadingCards,
        tries,
        score,
        matchCards,
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

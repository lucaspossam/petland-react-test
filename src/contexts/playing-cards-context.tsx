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
  handleSessionStorageData: () => void;
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

  const handleSessionStorageData = () => {
    const sessionPlayingCards = JSON.parse(
      sessionStorage.getItem("playingCards") ?? "[]"
    );

    const sessionCorrectPairs = JSON.parse(
      sessionStorage.getItem("correctPairs") ?? "[]"
    );

    const sessionTries = parseInt(sessionStorage.getItem("tries") ?? "0");
    const sessionScore = parseInt(sessionStorage.getItem("score") ?? "0");

    setGameStage("playing");
    setPlayingCards(sessionPlayingCards);
    setCorrectPairs(sessionCorrectPairs);
    setTries(sessionTries);
    setScore(sessionScore);
  };

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

      sessionStorage.setItem("playingCards", JSON.stringify(shuffledCards));
      sessionStorage.setItem("gameStage", "playing");

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

    sessionStorage.setItem("gameStage", "start");
    sessionStorage.setItem("playingCards", JSON.stringify([]));
    sessionStorage.setItem("correctPairs", JSON.stringify([]));
    sessionStorage.setItem("tries", "0");
    sessionStorage.setItem("score", "0");

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
    const sumScore = score + 1;
    setScore(sumScore);
    sessionStorage.setItem("score", sumScore.toString());
    sessionStorage.setItem(
      "correctPairs",
      JSON.stringify([...correctPairs, ...cards])
    );
    setCorrectPairs([...correctPairs, ...cards]);
  };

  const isCorrectPairs = () => {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    return card1.id === card2.id && card1.key !== card2.key;
  };

  const matchCards = () => {
    const sumTries = tries + 1;
    setTries(sumTries);
    sessionStorage.setItem("tries", sumTries.toString());
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
        handleSessionStorageData,
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

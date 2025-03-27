import { useEffect } from "react";
import { Card, usePlayingCards } from "../contexts/playing-cards-context";

export function usePlayingCardsGame() {
  const {
    startCardsGame,
    playingCards,
    correctPairs,
    selectedCards,
    selectCard,
    updateCorrectPairs,
    removeSelection,
    playingCardTimer,
    gameStage,
    restartCardsGame,
  } = usePlayingCards();

  const isCorrectPairs = () => {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    return card1.id === card2.id && card1.key !== card2.key;
  };

  const handleSelectCard = (card: Card) => {
    selectCard(card);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (isCorrectPairs()) {
        updateCorrectPairs(selectedCards);
        removeSelection();
      } else {
        playingCardTimer.current = setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    return () => {
      if (playingCardTimer.current) {
        clearTimeout(playingCardTimer.current);
      }
    };
  }, []);

  return {
    playingCards,
    correctPairs,
    selectedCards,
    handleSelectCard,
    startCardsGame,
    restartCardsGame,
    gameStage,
  };
}

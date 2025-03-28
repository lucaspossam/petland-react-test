import { useEffect } from "react";
import { Card, usePlayingCards } from "../contexts/playing-cards-context";

export function usePlayingCardsGame() {
  const {
    startCardsGame,
    playingCards,
    correctPairs,
    selectedCards,
    selectCard,
    playingCardTimer,
    gameStage,
    restartCardsGame,
    loadingCards,
    tries,
    score,
    matchCards,
    handleSessionStorageData,
  } = usePlayingCards();

  const handleSelectCard = (card: Card) => {
    selectCard(card);
  };

  useEffect(() => {
    if (sessionStorage.getItem("gameStage") !== "start") {
      handleSessionStorageData();
    }
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      matchCards();
    }
    return () => {
      if (playingCardTimer.current) {
        clearTimeout(playingCardTimer.current);
      }
    };
  }, [selectedCards]);

  return {
    playingCards,
    correctPairs,
    selectedCards,
    handleSelectCard,
    startCardsGame,
    restartCardsGame,
    gameStage,
    loadingCards,
    tries,
    score,
  };
}

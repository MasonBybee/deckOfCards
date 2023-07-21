import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import NewCardButton from "./NewCardButton";
import ShuffleButton from "./ShuffleButton";

const DeckOfCards = () => {
  const initialDrawnCards = [];
  const [drawnCards, setDrawnCards] = useState(initialDrawnCards);
  const [deckId, setDeckId] = useState("");
  const [drawCardsToggle, setDrawCardsToggle] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeckId(res.data.deck_id);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  }, []);

  useEffect(() => {
    let intervalId;

    if (drawnCards.length === 52) {
      clearInterval(intervalId);
    }
    if (drawCardsToggle) {
      intervalId = setInterval(() => {
        getNewCard();
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [drawnCards.length, drawCardsToggle]);

  const toggleCardDraw = () => {
    setDrawCardsToggle((cardToggle) => !cardToggle);
  };

  const shuffle = async () => {
    setDrawnCards(initialDrawnCards);
    await axios.post(`https://deckofcardsapi.com/api/deck/${deckId}/return/`);
    await axios.post(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
  };

  const getNewCard = async () => {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    if (res.data.remaining === 0) {
      alert("Out of cards in this deck. Shuffle to draw more cards!");
      toggleCardDraw();
      return;
    }
    if (res.data.success) {
      const newCard = res.data.cards[0];
      setDrawnCards((cards) => [...cards, newCard]);
    } else {
      console.log("Failed to draw a card:", res.data.error);
    }
  };

  return (
    <div>
      <NewCardButton toggleCardDraw={toggleCardDraw} />
      {drawnCards.map((n, i) => (
        <Card image={n.image} key={i} />
      ))}
      <ShuffleButton shuffle={shuffle} />
    </div>
  );
};

export default DeckOfCards;

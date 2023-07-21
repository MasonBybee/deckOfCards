import React from "react";
import "./NewCardButton.css";

const NewCardButton = ({ drawCardsToggle, toggleCardDraw }) => {
  const handleClick = () => {
    toggleCardDraw();
  };

  return (
    <button className="NewCardButton" onClick={handleClick}>
      {drawCardsToggle ? "Stop Drawing Cards" : "Draw Cards!"}
    </button>
  );
};

export default NewCardButton;

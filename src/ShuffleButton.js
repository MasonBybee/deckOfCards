import React from "react";
import "./ShuffleButton.css";

const ShuffleButton = ({ shuffle }) => {
  const handleClick = () => {
    shuffle();
  };
  return (
    <button className="ShuffleButton" onClick={handleClick}>
      Shuffle!
    </button>
  );
};

export default ShuffleButton;

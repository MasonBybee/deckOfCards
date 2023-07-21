import React from "react";
import "./Card.css";

const Card = ({ image }) => {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="Card"></div>
  );
};
export default Card;

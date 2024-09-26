import React from 'react';
import './SingleCard.css';
import coverImg from '/img/cover.png';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={`inner ${flipped ? "flipped" : ""}`}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={coverImg}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

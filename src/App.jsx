import React, { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import beeImage from '/img/bee.png';
import dinosaurImage from '/img/dinosaur.png';
import elephantImage from '/img/elephant.png';
import foxImage from '/img/fox.png';
import frogImage from '/img/frog.png';
import happyFaceImage from '/img/happy-face.png';
import happy from '/img/happy.png';
import monkey from '/img/monkey.png';
import panda from '/img/panda.png';
import shark from '/img/shark.png'


const cardImages = [
  { src: beeImage, matched: false },
  { src: dinosaurImage, matched: false },
  { src: elephantImage, matched: false },
  { src: foxImage, matched: false },
  { src: frogImage, matched: false },
  { src: happyFaceImage, matched: false },
  { src: happy, matched: false },
  { src: monkey, matched: false },
  { src: panda, matched: false },
  { src: shark, matched: false },
 
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => 
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="h-screen w-full  bg-primary px-3">
      <h1 className="text-4xl text-white font-bold text-center pt-4">Card Flip Game</h1>
      <div className="flex justify-center pt-4 gap-3">
        <button
          onClick={shuffleCards}
          className="bg-transparent border-2 border-white px-3 py-2 rounded text-white font-bold cursor-pointer text-base hover:bg-third"
        >
          New Game
        </button>
        <button  className="bg-transparent border-2 border-white px-3 py-2 rounded text-white font-bold cursor-pointer text-base hover:bg-third">Hard</button>
        <p className="text-lg text-white ">Turns: {turns}</p>
      </div>

      <div className="card-grid mt-10 grid grid-cols-4 lg:grid-cols-8 gap-5">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

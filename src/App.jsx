import React, { useState, useEffect } from 'react';
import './index.css';
import cardArray from './components/cards';

function App() {
  const [cards, setCards] = useState([cardArray]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || selectedCards.includes(card) || card.img === 'public/exercise-1/tick.svg') {
      return; 
    }

    const updatedSelectedCards = [...selectedCards, card];

    if (updatedSelectedCards.length === 2) {
      setAttempts(attempts + 1);

      if (updatedSelectedCards[0].name === updatedSelectedCards[1].name) {
        setScore(score + 1);
        setCards((prevCards) =>
          prevCards.map((c) => {
            if (c.id === updatedSelectedCards[0].id || c.id === updatedSelectedCards[1].id) {
              return { ...c, img: 'public/exercise-1/tick.svg' };
            }
            return c;
          })
        );
        if (score + 1 === cardArray.length / 2) {
          setGameOver(true);
        }
      }
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    } else {
      setSelectedCards(updatedSelectedCards);
    }
  };

  const resetGame = () => {
    setCards([...cardArray]);
    setSelectedCards([]);
    setScore(0);
    setAttempts(0);
    setGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="App">
      <h3>Score: {score}</h3>
      <h3>Attempts: {attempts}</h3>

      <div className="b-grid">
        {cards.map((card) => (
          <img
            key={card.id}
            src={card.img}
            alt={card.name}
            onClick={() => handleCardClick(card)}
            style={{ cursor: card.img === 'public/exercise-1/tick.svg' ? 'default' : 'pointer' }}
          />
        ))}
      </div>

      {gameOver && (
        <div>
          <h2>Congratulations🎈</h2>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;

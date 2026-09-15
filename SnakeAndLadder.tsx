import { useState } from "react";
import "./App.css";

const snakes = {
  16: 6,
  48: 26,
  64: 60,
  93: 73,
};

const ladders = {
  3: 22,
  8: 30,
  28: 55,
  58: 77,
};

function generateBoard() {
  let board = [];
  let num = 100;

  for (let row = 0; row < 10; row++) {
    let rowArr = [];
    for (let col = 0; col < 10; col++) {
      rowArr.push(num--);
    }
    if (row % 2 !== 0) rowArr.reverse();
    board.push(rowArr);
  }
  return board;
}

export default function SnakeAndLadder() {
  const board = generateBoard();
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(null);
  const [message, setMessage] = useState("");

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    let newPos = position + roll;

    if (newPos > 100) {
      setDice(roll);
      setMessage("Roll too high!");
      return;
    }

    if (snakes[newPos]) {
      setMessage(`🐍 Snake! Go down to ${snakes[newPos]}`);
      newPos = snakes[newPos];
    } else if (ladders[newPos]) {
      setMessage(`🪜 Ladder! Go up to ${ladders[newPos]}`);
      newPos = ladders[newPos];
    } else {
      setMessage("");
    }

    setDice(roll);
    setPosition(newPos);
  };

  return (
    <div className="container">
      <h1>🐍 Snake & Ladder 🪜</h1>

      <div className="board">
        {board.flat().map((cell) => (
          <div
            key={cell}
            className={`cell
              ${snakes[cell] ? "snake-start" : ""}
              ${Object.values(snakes).includes(cell) ? "snake-end" : ""}
              ${ladders[cell] ? "ladder-start" : ""}
              ${Object.values(ladders).includes(cell) ? "ladder-end" : ""}
            `}
          >
            <span className="number">{cell}</span>

            {snakes[cell] && <span className="icon">🐍</span>}
            {ladders[cell] && <span className="icon">🪜</span>}

            {cell === position && <div className="player">🔴</div>}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={rollDice} disabled={position === 100}>
          Roll Dice 🎲
        </button>

        {dice && <p>Dice: {dice}</p>}
        <p>{message}</p>
        <p>Position: {position}</p>
      </div>
    </div>
  );
}

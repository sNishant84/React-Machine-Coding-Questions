import React, { useEffect, useState } from "react";

const size = 3;

function TicTacToe() {
  const initializeState = () => {
    return Array.from({ length: size }, () => Array(size).fill(null));
  };

  const [board, setBoard] = useState(initializeState());
  const [turnX, setTurnX] = useState(true); // true = Player, false = Bot
  const [playerSymbol, setPlayerSymbol] = useState(null); // Track if player chose 'X' or 'O'
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  const checkWinner = (board, size) => {
    // Rows
    for (let i = 0; i < size; i++) {
      const symbol = board[i][0];
      if (symbol && board[i].every(cell => cell === symbol)) return symbol;
    }

    // Columns
    for (let j = 0; j < size; j++) {
      const symbol = board[0][j];
      if (symbol && board.every(row => row[j] === symbol)) return symbol;
    }

    // Diagonal
    let symbol = board[0][0];
    if (symbol && board.every((_, i) => board[i][i] === symbol)) return symbol;

    // Anti-diagonal
    symbol = board[0][size - 1];
    if (symbol && board.every((_, i) => board[i][size - 1 - i] === symbol)) return symbol;

    return null;
  };

  const isBoardFull = (board) => {
    return board.every(row => row.every(cell => cell !== null));
  };

  const winner = checkWinner(board, size);
  const isDraw = !winner && isBoardFull(board);

  const status = winner
    ? `${winner} is the winner`
    : isDraw
    ? "It's a draw"
    : turnX
    ? `Your Turn (${playerSymbol === 'X' ? 'X' : 'O'})`
    : `Bot's Turn (${playerSymbol === 'X' ? 'O' : 'X'})`;

  const getEmptyCells = (board) => {
    const empty = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!board[i][j]) empty.push([i, j]);
      }
    }
    return empty;
  };

  const botMove = () => {
    const empty = getEmptyCells(board);
    if (empty.length === 0 || winner) return;

    const [row, col] = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = playerSymbol === 'X' ? 'O' : 'X'; // Bot plays opposite symbol
    setTimeout(() => {
      setBoard(newBoard);
      setTurnX(true); // Back to player
    }, 500); // Simulate thinking delay
  };

  useEffect(() => {
    if (gameStarted && !turnX && !winner && !isBoardFull(board)) {
      botMove();
    }
  }, [turnX, board, winner, gameStarted]);

  const handleClick = (rowIndex, colIndex) => {
    if (!turnX || board[rowIndex][colIndex] || winner || isDraw) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[rowIndex][colIndex] = playerSymbol === 'X' ? 'X' : 'O';
    setBoard(newBoard);
    setTurnX(false); // Bot's turn
  };

  const handleReset = () => {
    setBoard(initializeState());
    setTurnX(true);
    setGameStarted(false); // Reset game started state
  };

  const startGame = (symbol) => {
    setPlayerSymbol(symbol);
    setGameStarted(true);
    setBoard(initializeState());
    setTurnX(true); // Always set the player to go first
  };

  if (!gameStarted) {
    return (
      <div className="container">
        <h2>Select Your Symbol</h2>
        <button onClick={() => startGame('X')}>Play as X</button>
        <button onClick={() => startGame('O')}>Play as O</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gap: "5px",
          marginBottom: "10px"
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              className="cell"
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                cursor:
                  cell || winner || isDraw || !turnX
                    ? "not-allowed"
                    : "pointer"
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <div>Status: <strong>{status}</strong></div>
      <button onClick={handleReset} style={{ marginTop: "10px" }}>
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;

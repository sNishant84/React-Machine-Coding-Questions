import React, { useState, useEffect } from "react";

const size = 3;

function TicTacToe() {
  // Initialize the board and default state for turnX and playerSymbol
  const initializeState = () => Array.from({ length: size }, () => Array(size).fill(null));

  const [board, setBoard] = useState(initializeState());
  const [turnX, setTurnX] = useState(true); // true = Player, false = Bot
  const [playerSymbol, setPlayerSymbol] = useState(null); // Track if player chose 'X' or 'O'
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  // Check for a winner in a single pass
  const checkWinner = () => {
    // Rows, Columns, Diagonals
    for (let i = 0; i < size; i++) {
      const rowSymbol = board[i][0];
      if (rowSymbol && board[i].every(cell => cell === rowSymbol)) return rowSymbol;

      const colSymbol = board[0][i];
      if (colSymbol && board.every(row => row[i] === colSymbol)) return colSymbol;
    }

    // Diagonal
    const diag1 = board[0][0];
    if (diag1 && board.every((_, i) => board[i][i] === diag1)) return diag1;

    // Anti-diagonal
    const diag2 = board[0][size - 1];
    if (diag2 && board.every((_, i) => board[i][size - 1 - i] === diag2)) return diag2;

    return null;
  };

  // Check if the board is full
  const isBoardFull = () => board.every(row => row.every(cell => cell !== null));

  const winner = checkWinner();
  const isDraw = !winner && isBoardFull();

  // Set status message
  const status = winner
    ? `${winner} is the winner`
    : isDraw
    ? "It's a draw"
    : turnX
    ? `Your Turn (${playerSymbol === "X" ? "X" : "O"})`
    : `Bot's Turn (${playerSymbol === "X" ? "O" : "X"})`;

  // Get list of empty cells
  const getEmptyCells = () => {
    return board.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (!cell ? [rowIndex, colIndex] : null)).filter(Boolean)
    );
  };

  // Bot move logic
  const botMove = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length === 0 || winner) return;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map((row, rowIndex) => 
      rowIndex === row ? [...row] : row // Deep copy only the affected row
    );
    newBoard[row][col] = playerSymbol === "X" ? "O" : "X";
    setBoard(newBoard);
    setTurnX(true); // Back to player's turn
  };

  useEffect(() => {
    if (gameStarted && !turnX && !winner && !isBoardFull()) {
      botMove();
    }
  }, [turnX, board, winner, gameStarted]);

  // Handle cell click (Player's move)
  const handleCellClick = (row, col) => {
    if (!turnX || board[row][col] || winner || isDraw) return;

    const newBoard = board.map((row, rowIndex) =>
      rowIndex === row ? [...row] : row // Deep copy only the affected row
    );
    newBoard[row][col] = playerSymbol;
    setBoard(newBoard);
    setTurnX(false); // Bot's turn
  };

  // Handle reset of the game
  const handleReset = () => {
    setBoard(initializeState());
    setTurnX(true);
    setGameStarted(false); // Reset game started state
  };

  // Start the game based on the player's symbol choice
  const startGame = (symbol) => {
    setPlayerSymbol(symbol);
    setGameStarted(true);
    setBoard(initializeState());
    setTurnX(symbol === "X"); // Player goes first if 'X', else bot goes first
  };

  if (!gameStarted) {
    return (
      <div className="container">
        <h2>Select Your Symbol</h2>
        <button onClick={() => startGame("X")}>Play as X</button>
        <button onClick={() => startGame("O")}>Play as O</button>
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
          marginBottom: "10px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              className="cell"
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                cursor:
                  cell || winner || isDraw || !turnX ? "not-allowed" : "pointer",
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

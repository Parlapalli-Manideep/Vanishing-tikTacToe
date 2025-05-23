import { useState } from "react";
import PlayerBar from "./PlayBar";


const GameBoard = ({ player1, player2 }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(player1);
  const [currentEmoji, setCurrentEmoji] = useState(player1.emoji);

  const handleClick = (i) => {
    if (board[i]) return;
    const newBoard = [...board];
    newBoard[i] = currentEmoji;
    setBoard(newBoard);
    const nextPlayer = turn.name === player1.name ? player2 : player1;
    setTurn(nextPlayer);
    setCurrentEmoji(nextPlayer.emoji);
  };

  return (
    <div className="container text-center">
      <h1 className="fw-bold text-purple mt-4">Emoji Tic Tac Toe</h1>
      <p className="text-muted">A twisted version with vanishing emojis!</p>

      <PlayerBar player1={player1} player2={player2} />

      <div className="mt-4 mb-2">
        <h5><strong className="text-purple">{turn.name}</strong>'s turn</h5>
      </div>

      <div className="d-grid mx-auto" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {board.map((cell, i) => (
          <div key={i}
            className="border rounded d-flex align-items-center justify-content-center"
            style={{
              width: '100px',
              height: '100px',
              fontSize: '2rem',
              background: '#f8f0ff',
              borderColor: 'purple',
              cursor: 'pointer'
            }}
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

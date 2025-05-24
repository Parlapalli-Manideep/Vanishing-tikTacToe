import { useState } from "react";
import PlayerBar from "./PlayBar";
import WinOverlay from "./WinOverlay";
import "../styling/gameBoard.css";
import checkWin from "./checkWin";
import emojiCategories from "../data/emoji";

const GameBoard = ({ player1, player2 }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(player1);
  const [moves, setMoves] = useState({ [player1.name]: [], [player2.name]: [] });
  const [winner, setWinner] = useState(null);
  const [lastUsedEmoji, setLastUsedEmoji] = useState({
    [player1.name]: null,
    [player2.name]: null
  });

  const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const currentMoves = [...moves[turn.name]];
    const newBoard = [...board];
    const randomEmoji = getRandomEmoji(turn.emojiCategory);

    newBoard[i] = randomEmoji;
    currentMoves.push(i);

    if (currentMoves.length > 3) {
      const removeIndex = currentMoves.shift();
      newBoard[removeIndex] = null;
    }

    if (checkWin(currentMoves)) {
      setWinner({ name: turn.name, emoji: randomEmoji, positions: currentMoves });
    }

    setBoard(newBoard);
    setMoves({ ...moves, [turn.name]: currentMoves });
    setLastUsedEmoji({ ...lastUsedEmoji, [turn.name]: randomEmoji });
    setTurn(turn.name === player1.name ? player2 : player1);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setMoves({ [player1.name]: [], [player2.name]: [] });
    setTurn(player1);
    setWinner(null);
    setLastUsedEmoji({ [player1.name]: null, [player2.name]: null });
  };

  return (
    <div className="game-container text-center">
      <h1 className="fw-bold text-purple mt-4">Emoji Tic Tac Toe</h1>
      <p className="text-muted">A twisted version with vanishing emojis!</p>

      <PlayerBar
        player1={{ ...player1, emoji: lastUsedEmoji[player1.name] }}
        player2={{ ...player2, emoji: lastUsedEmoji[player2.name] }}
      />

      <div className="mt-3">
        {!winner && (
          <h5>
            <strong className="text-purple">
              {turn.name} {lastUsedEmoji[turn.name] || ""}
            </strong>'s turn
          </h5>
        )}
      </div>

      <div className="board-grid mt-3">
        {board.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <WinOverlay
          name={winner.name}
          emoji={winner.emoji}
          positions={winner.positions}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
};

export default GameBoard;

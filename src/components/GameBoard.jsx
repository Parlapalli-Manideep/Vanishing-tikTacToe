import { useState } from "react";
import PlayerBar from "./PlayBar";
import WinOverlay from "./WinOverlay";
import "../styling/gameBoard.css";
import checkWin from "./checkWin";
import emojiCategories from "../data/emoji";

const GameBoard = ({ player1, player2, onBackToMenu }) => {
  const getRandomEmoji = (category, usedEmojis = []) => {
    const emojis = emojiCategories[category];
    const availableEmojis = emojis.filter(emoji => !usedEmojis.includes(emoji));
    
    if (availableEmojis.length === 0) {
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    return availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(player1);
  const [moves, setMoves] = useState({ [player1.name]: [], [player2.name]: [] });
  const [winner, setWinner] = useState(null);
  const [usedEmojis, setUsedEmojis] = useState([]);
  const [lastUsedEmoji, setLastUsedEmoji] = useState({
    [player1.name]: null,
    [player2.name]: null,
  });
  const [nextEmoji, setNextEmoji] = useState({
    [player1.name]: getRandomEmoji(player1.emojiCategory),
    [player2.name]: getRandomEmoji(player2.emojiCategory),
  });

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const currentMoves = [...moves[turn.name]];
    const newBoard = [...board];
    const emojiToUse = nextEmoji[turn.name];
    let newUsedEmojis = [...usedEmojis];

    newBoard[i] = emojiToUse;
    currentMoves.push(i);
    newUsedEmojis.push(emojiToUse);

    if (currentMoves.length > 3) {
      const removeIndex = currentMoves.shift();
      const removedEmoji = newBoard[removeIndex];
      newBoard[removeIndex] = null;
      
      newUsedEmojis = newUsedEmojis.filter(emoji => emoji !== removedEmoji);
    }

    if (checkWin(currentMoves)) {
      const winningEmojis = currentMoves.map(position => newBoard[position]);
      setWinner({ 
        name: turn.name, 
        positions: currentMoves,
        winningEmojis: winningEmojis
      });
    }

    const nextTurn = turn.name === player1.name ? player2 : player1;

    const currentBoardEmojis = newBoard.filter(cell => cell !== null);
    const nextPlayerNextEmoji = getRandomEmoji(nextTurn.emojiCategory, currentBoardEmojis);

    setBoard(newBoard);
    setMoves({ ...moves, [turn.name]: currentMoves });
    setUsedEmojis(newUsedEmojis);
    setLastUsedEmoji({ ...lastUsedEmoji, [turn.name]: emojiToUse });
    setTurn(nextTurn);

    setNextEmoji({
      ...nextEmoji,
      [nextTurn.name]: nextPlayerNextEmoji,
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setMoves({ [player1.name]: [], [player2.name]: [] });
    setTurn(player1);
    setWinner(null);
    setUsedEmojis([]);
    setLastUsedEmoji({ [player1.name]: null, [player2.name]: null });
    setNextEmoji({
      [player1.name]: getRandomEmoji(player1.emojiCategory),
      [player2.name]: getRandomEmoji(player2.emojiCategory),
    });
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
              {turn.name} {nextEmoji[turn.name] || ""}
            </strong>
            's turn
          </h5>
        )}
      </div>

      <div className="board-grid mt-3">
        {board.map((cell, i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <WinOverlay
          name={winner.name}
          winningEmojis={winner.winningEmojis}
          positions={winner.positions}
          onPlayAgain={resetGame}
          onMenu={onBackToMenu}
        />
      )}
    </div>
  );
};

export default GameBoard;
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import GameStartOverlay from './components/GameOverlay';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import emojiCategories from './data/emoji';

function App() {
  const [step, setStep] = useState(1);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [showGameStart, setShowGameStart] = useState(false);

  const handlePlayer1Next = (data) => {
    setPlayer1(data);
    setStep(2);
  };

  const handlePlayer2Next = (data) => {
    setPlayer2(data);
    setShowGameStart(true);
  };

  const handleGameStartFinish = () => {
    setStep(3);
  };

  const getEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <>
      {showGameStart && <GameStartOverlay onFinish={handleGameStartFinish} />}

      {step === 1 && (
        <PlayerSetup
          playerNumber={1}
          onNext={handlePlayer1Next}
          disabledCategories={[]}
        />
      )}

      {step === 2 && (
        <PlayerSetup
          playerNumber={2}
          onNext={handlePlayer2Next}
          disabledCategories={[player1.emojiCategory]}
        />
      )}

      {step === 3 && (
        <GameBoard
          player1={player1}
          player2={player2}
        />
      )}

    </>
  );
}

export default App;

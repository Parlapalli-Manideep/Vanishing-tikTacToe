import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';

function App() {
  const [step, setStep] = useState(1);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const handlePlayer1Next = (data) => {
    setPlayer1(data);
    setStep(2);
  };

  const handlePlayer2Next = (data) => {
    setPlayer2(data);
    console.log("Both players ready:", { player1, player2: data });
  };

  return (
    <>
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
    </>
  );
}

export default App;

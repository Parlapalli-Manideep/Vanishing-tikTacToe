import { useEffect, useState } from 'react';
import '../styling/gameOverlay.css';

const GameStartOverlay = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return visible ? (
    <div className="game-start-overlay">
      <h1 className="animate-pop">Game Starts!</h1>
    </div>
  ) : null;
};

export default GameStartOverlay;

import { useState, useEffect } from "react";
import "../styling/winOverlay.css";

const WinOverlay = ({ name, winningEmojis, positions, onPlayAgain, onMenu }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('entrance');

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setAnimationPhase('celebration');
    }, 500);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const generateConfetti = () => {
    const confettiPieces = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const shapes = ['🎉', '🎊', '⭐', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 50; i++) {
      const isEmoji = Math.random() > 0.7;
      confettiPieces.push(
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: isEmoji ? 'transparent' : colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            fontSize: isEmoji ? '1.5rem' : '0',
          }}
        >
          {isEmoji ? shapes[Math.floor(Math.random() * shapes.length)] : ''}
        </div>
      );
    }
    return confettiPieces;
  };

  return (
    <div className="win-overlay">
      {showConfetti && (
        <div className="confetti-container">
          {generateConfetti()}
        </div>
      )}
      
      <div className="fireworks">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>

      <div className={`win-card shadow-lg ${animationPhase}`}>
        <div className="win-header">
          <span role="img" aria-label="trophy" className="trophy-bounce me-2">🏆</span>
          <h3 className="m-0 winner-text">{name} Wins!</h3>
        </div>
        
        <div className="win-emojis mt-3">
          {winningEmojis && winningEmojis.map((emoji, i) => (
            <span 
              key={i} 
              className="winning-emoji"
              style={{ 
                animationDelay: `${i * 0.2}s`
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
        
        <div className="d-flex gap-3 mt-4 justify-content-center">
          <button className="btn btn-purple btn-animated" onClick={onPlayAgain}>
            🔄 Play Again
          </button>
          <button className="btn btn-outline-purple btn-animated" onClick={onMenu}>
            🏠 Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinOverlay;
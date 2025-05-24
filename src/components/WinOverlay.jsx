import "../styling/winOverlay.css";

const WinOverlay = ({ name, emoji, positions, onPlayAgain }) => {
  return (
    <div className="win-overlay">
      <div className="win-card shadow-lg">
        <div className="win-header">
          <span role="img" aria-label="trophy" className="me-2">🏆</span>
          <h3 className="m-0">{name} Wins!</h3>
        </div>
        <div className="win-emojis mt-3">
          {positions.map((_, i) => (
            <span key={i} style={{ fontSize: "2rem", margin: "0 8px" }}>
              {emoji}
            </span>
          ))}
        </div>
        <button className="btn btn-purple mt-4" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinOverlay;

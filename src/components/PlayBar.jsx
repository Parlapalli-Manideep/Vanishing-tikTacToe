const PlayerBar = ({ player1, player2 }) => (
  <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '720px' }}>
    <div className="fw-bold text-purple">{player1.name} {player1.emoji}</div>
    <button className="btn btn-outline-info btn-sm">❓ Rules</button>
    <div className="fw-bold text-purple">{player2.emoji} {player2.name}</div>
  </div>
);

export default PlayerBar;

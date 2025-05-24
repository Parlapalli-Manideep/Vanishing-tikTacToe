import emojiCategories from "../data/emoji";

const getStaticEmoji = (category) => {
  const emojis = emojiCategories[category];
  return emojis && emojis.length > 0 ? emojis[0] : "❓";
};

const PlayerBar = ({ player1, player2 }) => (
  <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '720px' }}>
    <div className="fw-bold text-purple">
      {player1.name} <span>{getStaticEmoji(player1.emojiCategory)}</span>
    </div>
    <button className="btn btn-outline-info btn-sm">❓ Rules</button>
    <div className="fw-bold text-purple">
      <span>{getStaticEmoji(player2.emojiCategory)}</span> {player2.name}
    </div>
  </div>
);

export default PlayerBar;

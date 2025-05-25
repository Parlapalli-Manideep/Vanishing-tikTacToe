import { useState } from "react";
import emojiCategories from "../data/emoji";
import RulesModal from "./RulesModal";

const getStaticEmoji = (category) => {
  const emojis = emojiCategories[category];
  return emojis && emojis.length > 0 ? emojis[0] : "❓";
};

const PlayerBar = ({ player1, player2 }) => {
  const [showRules, setShowRules] = useState(false);

  const handleShowRules = () => setShowRules(true);
  const handleHideRules = () => setShowRules(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '720px' }}>
        <div className="fw-bold text-purple">
          {player1.name} <span>{getStaticEmoji(player1.emojiCategory)}</span>
        </div>
        <button className="btn btn-outline-info btn-sm" onClick={handleShowRules}>
          ❓ Rules
        </button>
        <div className="fw-bold text-purple">
          <span>{getStaticEmoji(player2.emojiCategory)}</span> {player2.name}
        </div>
      </div>
      
      <RulesModal show={showRules} onHide={handleHideRules} />
    </>
  );
};

export default PlayerBar;
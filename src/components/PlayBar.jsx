import { useState } from "react";
import RulesModal from "./RulesModal";

const PlayerBar = ({ player1, player2, activePlayer }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => setShowModal(!showModal);

  const getPlayerClass = (player) =>
    player.name === activePlayer.name ? "bg-light shadow-sm px-2 rounded" : "";

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '720px' }}>
        <div className={`fw-bold text-purple ${getPlayerClass(player1)}`}>
          {player1.name} {player1.emoji}
        </div>
        <button className="btn btn-outline-info btn-sm" onClick={handleModalToggle}>
          ❓ Rules
        </button>
        <div className={`fw-bold text-purple ${getPlayerClass(player2)}`}>
          {player2.emoji} {player2.name}
        </div>
      </div>
      <RulesModal show={showModal} onHide={handleModalToggle} />
    </>
  );
};

export default PlayerBar;

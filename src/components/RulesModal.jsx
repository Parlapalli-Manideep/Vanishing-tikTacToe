import { Modal, Button } from "react-bootstrap";

const RulesModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>🧠 Game Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-unstyled">
          <li>✅ Take turns to place your emoji.</li>
          <li>🎯 Match 3 in a row (vertical, horizontal, or diagonal) to win.</li>
          <li>🔄 You can only have 3 emojis on the board.</li>
          <li>✨ Placing a 4th removes your oldest emoji (FIFO).</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RulesModal;

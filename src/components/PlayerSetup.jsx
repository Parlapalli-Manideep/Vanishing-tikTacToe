import { useState } from "react";
import emojiCategories from "../data/emoji";
import EmojiCategory from "./EmojiCategory";

const PlayerSetup = ({ playerNumber, onNext, disabledCategories }) => {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
    } else if (!selectedCategory) {
      setError("Please select an emoji category.");
    } else {
      setError('');
      onNext({ name, emojiCategory: selectedCategory });
    }
  };
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-purple">Emoji Tic Tac Toe</h1>
      <p className="text-muted">A twisted version with vanishing emojis!</p>

      <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h5 className="mb-3">Player {playerNumber} Setup</h5>

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mb-2">Choose Your Emoji Category</div>
        <div className="d-flex flex-wrap justify-content-center">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <EmojiCategory
              key={category}
              category={category}
              emojis={emojis}
              selected={selectedCategory === category}
              disabled={disabledCategories.includes(category)}
              onSelect={setSelectedCategory}
            />
          ))}
        </div>

        {error && <div className="text-danger mt-3">{error}</div>}

        <button className="btn btn-primary mt-4 w-100" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;

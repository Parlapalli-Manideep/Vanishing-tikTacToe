const EmojiCategory = ({ category, emojis, selected, disabled, onSelect }) => {
  return (
    <div
      className={`border rounded p-3 text-center m-2 cursor-pointer ${selected ? 'border-primary bg-light' : ''} ${disabled ? 'opacity-50' : ''}`}
      style={{ minWidth: '120px', pointerEvents: disabled ? 'none' : 'auto' }}
      onClick={() => !disabled && onSelect(category)}
    >
      <h6>{category}</h6>
      <div style={{ fontSize: '1.5rem' }}>{emojis.join(" ")}</div>
    </div>
  );
};

export default EmojiCategory;

export const FlashcardCard = ({ flashcard, onDelete, onUpdateLevel }) => {
  return (
    <div className="card" style={{ margin: "0.5rem 0" }}>
      <h3 style={{ marginTop: 0 }}>{flashcard.question}</h3>
      <p style={{ opacity: 0.9 }}>{flashcard.answer}</p>
      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Level: {flashcard.level}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="btn btn--primary" onClick={() => onUpdateLevel(flashcard.id, flashcard.level + 1)}>Increase Level</button>
        <button className="btn btn--ghost" onClick={() => onDelete(flashcard.id)}>Delete</button>
      </div>
    </div>
  );
};

export const FlashcardCard = ({ flashcard, onDelete, onUpdateLevel }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
      <h3>{flashcard.question}</h3>
      <p>{flashcard.answer}</p>
      <p>Level: {flashcard.level}</p>
      <button onClick={() => onUpdateLevel(flashcard.id, flashcard.level + 1)}>Increase Level</button>
      <button onClick={() => onDelete(flashcard.id)}>Delete</button>
    </div>
  );
};

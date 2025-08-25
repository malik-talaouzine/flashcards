import { FlashcardCard } from "./FlashcardCard";

export const FlashcardList = ({ flashcards, onDelete, onUpdateLevel }) => {
  return (
    <div className="stack">
      {flashcards.map((f) => (
        <FlashcardCard
          key={f.id}
          flashcard={f}
          onDelete={onDelete}
          onUpdateLevel={onUpdateLevel}
        />
      ))}
    </div>
  );
};

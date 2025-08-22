import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFlashcardsDueToday, updateFlashcardLevel } from "../services/flashcardService";

const PracticePage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      const data = await getFlashcardsDueToday();
      setFlashcards(data);
    };
    fetchFlashcards();
  }, []);

  if (flashcards.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>No flashcards available</p>
        <button onClick={() => navigate("/dashboard")}>⬅ Back to Dashboard</button>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleNext = async (isCorrect) => {
    const currentCard = flashcards[0]; // first card in the queue

    // Update backend
    await updateFlashcardLevel(currentCard.id, isCorrect ? currentCard.level + 1 : 0);

    const newQueue = flashcards.slice(1); // remove first card
    if (!isCorrect) {
      newQueue.push(currentCard); // put it at the end if wrong
    }

    setFlashcards(newQueue);
    setUserAnswer("");
    setShowResult(false);
  };


  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Practice Flashcards</h2>
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "1rem" }}
      >
        ⬅ Back to Dashboard
      </button>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "2rem",
          margin: "1rem auto",
          width: "300px",
        }}
      >
        <p>
          <strong>Question:</strong> {currentCard.question}
        </p>

        {!showResult ? (
          <>
            <input
              type="text"
              placeholder="Your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{ margin: "1rem", padding: "0.5rem", width: "100%" }}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <div>
            <p>
              <strong>Your answer:</strong> {userAnswer}
            </p>
            <p>
              <strong>Correct answer:</strong> {currentCard.answer}
            </p>
            <p>Were you correct?</p>
            <button
              onClick={() => handleNext(true)}
              style={{ margin: "0.5rem", background: "green", color: "white" }}
            >
              Right
            </button>
            <button
              onClick={() => handleNext(false)}
              style={{ margin: "0.5rem", background: "red", color: "white" }}
            >
              Wrong
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;



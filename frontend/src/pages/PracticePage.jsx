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
      <div className="center" style={{ marginTop: "2rem" }}>
        <div className="card" style={{ textAlign: "center", maxWidth: 520 }}>
          <p style={{ marginTop: 0 }}>No flashcards available</p>
          <button className="btn btn--ghost" onClick={() => navigate("/dashboard")}>⬅ Back to Dashboard</button>
        </div>
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
    <div className="center" style={{ marginTop: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 920 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Practice Flashcards</h2>
          <button className="btn btn--ghost" onClick={() => navigate("/dashboard")}>
            ⬅ Back to Dashboard
          </button>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <p style={{ marginTop: 0 }}>
            <strong>Question:</strong> {currentCard.question}
          </p>

          {!showResult ? (
            <>
              <input
                className="input"
                type="text"
                placeholder="Your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button className="btn btn--primary" style={{ marginTop: 10 }} onClick={handleSubmit}>Submit</button>
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
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <button className="btn btn--success" onClick={() => handleNext(true)}>Right</button>
                <button className="btn btn--danger" onClick={() => handleNext(false)}>Wrong</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;



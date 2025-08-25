import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlashcard } from "../services/flashcardService";

const CreateFlashcardPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    await createFlashcard({ question, answer });

    // Clear inputs to create another flashcard
    setQuestion("");
    setAnswer("");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="center" style={{ padding: "2rem" }}>
      <div className="card" style={{ width: "100%", maxWidth: 840 }}>
        <h2 style={{ marginTop: 0 }}>Create Flashcard</h2>
        <form onSubmit={handleSubmit} className="stack">
          <input
            className="input"
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button className="btn btn--primary" type="submit">Create Flashcard</button>
        </form>
        <button className="btn btn--ghost" onClick={handleBack} style={{ marginTop: 12 }}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default CreateFlashcardPage;

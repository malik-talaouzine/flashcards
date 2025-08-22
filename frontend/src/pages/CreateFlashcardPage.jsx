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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Create Flashcard</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", marginBottom: "1rem" }}>Create Flashcard</button>
      </form>
      <button onClick={handleBack} style={{ padding: "0.5rem" }}>Back to Dashboard</button>
    </div>
  );
};

export default CreateFlashcardPage;

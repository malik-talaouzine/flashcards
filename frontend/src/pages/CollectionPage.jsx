import { useEffect, useState } from "react";
import { getFlashcards, deleteFlashcard, updateFlashcard } from "../services/flashcardService";
import { useNavigate } from "react-router-dom";

const CollectionPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({ question: "", answer: "", level: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteFlashcard(id);
    setFlashcards(flashcards.filter(f => f.id !== id));
  };

  const startEdit = (flashcard) => {
    setEditId(flashcard.id);
    setEditValues({
      question: flashcard.question,
      answer: flashcard.answer,
      level: flashcard.level,
    });
  };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
        };

  const handleUpdate = async (id) => {
    const { question, answer, level } = editValues;

    if (!question || !answer || level < 0 || level > 5) return;

    const updated = await updateFlashcard(id, { question, answer, level });
    setFlashcards(flashcards.map(f => f.id === id ? updated : f));
    setEditId(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Flashcard Collection</h2>
        <button className="btn btn--ghost" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Level</th>
              <th>Created At</th>
              <th>Next Query</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map(f => (
              <tr key={f.id}>
                <td>
                  {editId === f.id ? (
                    <input
                      className="input"
                      type="text"
                      value={editValues.question}
                      onChange={(e) =>
                        setEditValues(prev => ({ ...prev, question: e.target.value }))
                      }
                    />
                  ) : f.question}
                </td>
                <td>
                  {editId === f.id ? (
                    <input
                      className="input"
                      type="text"
                      value={editValues.answer}
                      onChange={(e) =>
                        setEditValues(prev => ({ ...prev, answer: e.target.value }))
                      }
                    />
                  ) : f.answer}
                </td>
                <td>
                  {editId === f.id ? (
                    <input
                      className="input"
                      type="number"
                      min="0"
                      max="5"
                      value={editValues.level}
                      onChange={(e) =>
                        setEditValues(prev => ({
                          ...prev,
                          level: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  ) : f.level}
                </td>
                <td>{formatDate(f.createdAt)}</td>
                <td>{formatDate(f.nextQuery)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {editId === f.id ? (
                    <>
                      <button className="btn btn--primary" onClick={() => handleUpdate(f.id)} style={{ marginRight: 8 }}>
                        Save
                      </button>
                      <button className="btn btn--ghost" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn" onClick={() => startEdit(f)} style={{ marginRight: 8 }}>
                        Edit
                      </button>
                      <button className="btn btn--ghost" onClick={() => handleDelete(f.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionPage;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleStart = () => {
    navigate("/practice"); // page to query/review flashcards
  };

  const handleCollection = () => {
    navigate("/collection"); // page to view all flashcards
  };

  const handleNewFlashcard = () => {
    navigate("/create"); // page to create a new flashcard
  };

  return (
    <div>
      <Navbar /> {/* logout button is inside Navbar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <button onClick={handleStart} style={{ margin: "1rem", padding: "1rem 2rem" }}>
          Start
        </button>
        <button onClick={handleCollection} style={{ margin: "1rem", padding: "1rem 2rem" }}>
          Collection
        </button>
        <button onClick={handleNewFlashcard} style={{ margin: "1rem", padding: "1rem 2rem" }}>
          New Flashcard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

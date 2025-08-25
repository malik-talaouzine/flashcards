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
      <Navbar />
      <div className="center" style={{ marginTop: "2rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: 920 }}>
          <h2 style={{ marginTop: 0 }}>Dashboard</h2>
          <div className="stack" style={{ marginTop: 12 }}>
            <button className="btn btn--primary" onClick={handleStart}>Start Practice</button>
            <button className="btn" onClick={handleCollection}>View Collection</button>
            <button className="btn" onClick={handleNewFlashcard}>Create New Flashcard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

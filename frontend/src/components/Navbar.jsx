import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <span>Flashcards App</span>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
    </nav>
  );
};

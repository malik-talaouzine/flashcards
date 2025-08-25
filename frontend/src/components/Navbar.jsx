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
    <nav className="nav">
      <div className="nav__brand" onClick={() => navigate("/dashboard")}>Flashcards</div>
      <div className="nav__actions">
        <button className="btn btn--ghost" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

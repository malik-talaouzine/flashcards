import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { username, email, password });
      alert("Registration successful! You can now login.");
      navigate("/"); // Redirect to login page after registration
    } catch (err) {
      alert("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Clickable text to go back to login */}
      <p
        onClick={() => navigate("/")}
        style={{ marginTop: "10px", cursor: "pointer", color: "blue", textDecoration: "underline" }}
      >
        Already have an account? Click here to login
      </p>
    </div>
  );
};

export default RegisterPage;

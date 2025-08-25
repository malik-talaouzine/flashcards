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
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">Create account</button>
        </form>
        <button type="button" className="auth-link" onClick={() => navigate("/")}>Already have an account? Sign in</button>
      </div>
    </div>
  );
};

export default RegisterPage;

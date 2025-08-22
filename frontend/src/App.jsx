import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PracticePage from "./pages/PracticePage";
import CollectionPage from "./pages/CollectionPage";
import RegisterPage from "./pages/RegisterPage";
import CreateFlashcardPage from "./pages/CreateFlashcardPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/create" element={<CreateFlashcardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

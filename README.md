## Flashcards – Full‑Stack Spaced Repetition App

Modern full‑stack application for creating, reviewing, and managing flashcards with a simple spaced‑repetition workflow. Built with React (Vite) on the frontend and ASP.NET Core Web API on the backend, with JWT‑based authentication.

### ✨ Highlights
- **Authentication**: JWT login/register, protected routes
- **Flashcards**: Create, list, edit, delete, practice queue
- **Practice Flow**: Answer prompts; mark Right/Wrong to update level and reschedule
- **Clean UI**: Modern, responsive styling with reusable utilities
- **API-Driven**: Well‑structured DTOs and repository pattern
- **Docker**: Dockerfile and docker‑compose for containerized runs

---

## Architecture

- **Frontend**: React + Vite
  - Routing via `react-router-dom`
  - Context‑based auth state (`AuthContext`)
  - Services layer for API calls (`src/services`)
  - Reusable UI styles in `src/App.css`

- **Backend**: ASP.NET Core Web API
  - Controllers: `AccountController`, `FlashcardController`
  - Data: `ApplicationDBContext`
  - Auth: `ITokenService` + `TokenService` for JWT
  - Repository: `IFlashcardRepository` + `FlashcardRepository`
  - DTOs: request/response models for clarity and safety

---

## Features

- **User Accounts**
  - Register and login via email/username/password
  - JWT token stored client‑side for subsequent requests

- **Flashcard Management**
  - Create flashcards (question/answer)
  - View collection in a table with inline edit and delete
  - Track `level`, `createdAt`, `nextQuery`

- **Practice Mode**
  - See the next card due today
  - Submit an answer, reveal correctness, then mark Right/Wrong
  - Level increases on Right; resets or requeues on Wrong

- **UI/UX**
  - Nav, cards, tables, inputs, and buttons styled with shared classes
  - Consistent layout, centered content, responsive widths

---

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- (Optional) Docker

### 1) Clone
```bash
git clone <your-fork-or-repo-url>
cd flashcards
```

### 2) Backend Setup
```bash
cd backend
dotnet restore
dotnet build
dotnet run
```
By default, the API listens on `http://localhost:5000` (adjust via `backend/appsettings.json` or `launchSettings.json`).

Key files:
- `Program.cs`: service registration, CORS, auth, controllers
- `Controllers/AccountController.cs`: register/login
- `Controllers/FlashcardController.cs`: CRUD + practice endpoints

### 3) Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` by default (Vite). API base URL is configured in `src/services/api.js`.

---

## Environment Configuration

Backend (`backend/appsettings.json`):
- JWT secret, issuer, audience
- Database connection string (if using a real DB)

Frontend:
- `src/services/api.js`: Set `baseURL` to your backend URL

---

## API Overview

Base URL: `http://localhost:8080/`

- `POST /login` – returns `{ token }`
- `POST /register` – creates a user
- `GET /flashcards` – list all cards
- `POST /flashcards` – create a card
- `PUT /flashcards/{id}` – update a card
- `DELETE /flashcards/{id}` – delete a card
- `GET /flashcards/due-today` – practice queue for today
- `PUT /flashcards/{id}/content` – update card content
- `PUT /flashcards/{id}/level` – update card level after practice


---

## Run with Docker

### Quick Start
```bash
docker compose up --build
```
This builds and runs the backend service as defined in `docker-compose.yml`.

In another terminal run:
```bash
cd frontend
npm run dev
```

---

## Project Structure

```text
flashcards/
  backend/                  # ASP.NET Core Web API
    Controllers/
    Data/
    Dtos/
    Interfaces/
    Mappers/
    Models/
    Repository/
    Service/
    Program.cs
  frontend/                 # React + Vite
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      App.css
      index.css
```

---

## Screens and Flows

- **Login / Register**: Auth forms with validation; on success, redirect to Dashboard
- **Dashboard**: Entry point to Practice, Collection, Create Flashcard
- **Create**: Card form to add new flashcards quickly
- **Collection**: Table with inline editing of question/answer/level; delete action
- **Practice**: Shows next question; submit your answer; mark Right/Wrong to advance

---

## Implementation Notes

- **Auth**
  - Client stores JWT (e.g., localStorage) via `AuthContext`
  - Axios instance attaches token for protected endpoints

- **Data Layer**
  - Repository pattern isolates data access
  - DTOs for requests/responses ensure API clarity and maintainability

- **Styling**
  - Shared utilities: `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--success`, `.btn--danger`, `.input`, `.card`, `.table`, `.stack`, `.center`, `.auth-*`
  - Pages align widths and prevent overflow; tables are fixed‑layout with wrapping

---

## Testing the App (Manual)

1) Register a new account
2) Login and land on Dashboard
3) Create sample flashcards
4) Visit Collection to edit/delete
5) Go to Practice; answer and mark Right/Wrong; observe level changes

---

## Roadmap / Enhancements

- Real spaced‑repetition algorithm (SM‑2 or variants)
- Tags, decks, search, and filters
- Rich‑text/Markdown support in questions/answers
- Progress analytics and streaks
- Dark/light theme toggle
- E2E tests (Playwright) and unit tests
- CI/CD pipeline

---

## License

MIT – free to use and modify. Attribution appreciated.

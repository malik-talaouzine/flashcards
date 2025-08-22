import API from "./api";

export const getFlashcards = async () => {
  const res = await API.get("/flashcards");
  return res.data;
};

export const getFlashcardsDueToday = async () => {
  const res = await API.get("/flashcards/due-today");
  return res.data;
};

export const createFlashcard = async (flashcard) => {
  const res = await API.post("/flashcards", flashcard);
  return res.data;
};

export const updateFlashcard = async (id, data) => {
  const res = await API.put(`/flashcards/${id}`, data);
  return res.data;
};

export const updateFlashcardLevel = async (id, level) => {
  const res = await API.put(`/flashcards/${id}/level`, { level });
  return res.data;
};

export const updateFlashcardContent = async (id, content) => {
  const res = await API.put(`/flashcards/${id}/content`, content);
  return res.data;
};

export const deleteFlashcard = async (id) => {
  await API.delete(`/flashcards/${id}`);
};

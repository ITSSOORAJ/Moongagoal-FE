import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // ⚙️ Change if deployed (e.g., backend URL)

const instance = axios.create({
  baseURL: API_URL,
});

// ✅ Attach token to every request automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ API Wrapper
const api = {
  // 🔐 Auth
  register: (body) => instance.post('/auth/register', body),
  login: (body) => instance.post('/auth/login', body),

  // 🎯 Goals
  getGoals: (path = '/goals') => instance.get(path),
  createGoal: (body) => instance.post('/goals', body),
  updateGoal: (id, body) => instance.put(`/goals/${id}`, body),
  deleteGoal: (id) => instance.delete(`/goals/${id}`),

  // 📅 Daily Summary
  dailySummary: (date) =>
    instance.get('/goals/summary/daily', {
      params: date ? { date } : {},
    }),

  // 🗒️ Sticky Notes
  getNotes: () => instance.get('/notes'),
  createNote: (body) => instance.post('/notes', body),
  deleteNote: (id) => instance.delete(`/notes/${id}`),

  // 🤖 Bot (Analyze Notes)
  evaluateNotes: (notesArray) => instance.post('/notes/evaluate', { notes: notesArray }),
};

export default api;

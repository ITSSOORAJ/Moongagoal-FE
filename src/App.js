import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StickyNotes from './pages/Stickynotes';
import Navbar from './components/Navbar';
import api from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token]);

  useEffect(() => {
    if(user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
           <Route path="/notes" element={<StickyNotes />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

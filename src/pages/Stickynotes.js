import React, { useEffect, useState } from 'react';
import api from '../api';

export default function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [botResponse, setBotResponse] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Corrected API method
  const fetchNotes = async () => {
    try {
      const res = await api.getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  // ✅ Corrected Add Note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await api.createNote({ content: newNote });
      setNewNote('');
      fetchNotes(); // refresh after adding
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  // ✅ Corrected Delete Note
  const handleDelete = async (id) => {
    try {
      await api.deleteNote(id);
      fetchNotes(); // refresh after delete
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // ✅ Corrected Bot Evaluation
  const handleAskBot = async () => {
    try {
      const res = await api.evaluateNotes(notes);
      setBotResponse(res.data.reply);
    } catch (err) {
      console.error('Error contacting bot:', err);
    }
  };
  

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #8ee8f0ff, #090909ff)',
        minHeight: '100vh',
        padding: 30,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1 style={{ color: '#d63384' }}>🗒️ Sticky Notes</h1>

      {/* Add note section */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a quick note..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: '1px solid #ffcce0',
            outline: 'none',
            fontSize: 15,
          }}
        />
        <button className="cute-btn" onClick={handleAddNote}>➕ Add</button>
      </div>

      {/* Notes grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 15,
          marginTop: 30,
        }}
      >
        {notes.map((note) => (
          <div
            key={note._id}
           style={{
  background: `
    
    url('https://media.tenor.com/IZq6E1Bd4BIAAAAm/butterfly-freedom.webp')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 18,
  padding: '18px 15px',
  width: 240,
  minHeight: 120,
  color: '#3d003d',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: 1.5,
  textShadow: '0 1px 2px rgba(255,255,255,0.6)',
  boxShadow:
    '0 6px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.2)',
  position: 'relative',
  transform: 'rotate(-1deg)',
  transition: 'all 0.3s ease',
  overflowWrap: 'break-word',
  cursor: 'pointer',
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)';
  e.currentTarget.style.boxShadow =
    '0 10px 20px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.3)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'rotate(-1deg)';
  e.currentTarget.style.boxShadow =
    '0 6px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.2)';
}}

          >
            <p>{note.content}</p>
            <button
              onClick={() => handleDelete(note._id)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                border: 'none',
                background: 'transparent',
                color: '#d63384',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Bot Section */}
      <div style={{ marginTop: 40 }}>
        <button className="cute-btn" onClick={handleAskBot}>
          🤖 Ask Bot to Analyze Notes
        </button>
        {botResponse && (
          <div
            style={{
              marginTop: 15,
              background: '#fce4ec',
              padding: 15,
              borderRadius: 12,
              color: '#a64ca6',
            }}
          >
            <b>Bot:</b> {botResponse}
          </div>
        )}
      </div>
    </div>
  );
}

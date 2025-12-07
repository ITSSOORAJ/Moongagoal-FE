import React, { useEffect, useState } from 'react';
import api from '../api';


export default function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [botResponse, setBotResponse] = useState('');

  // ✅ Edit state
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await api.createNote({ content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // ✅ Start Editing
  const handleEditStart = (note) => {
    setEditingId(note._id);
    setEditedText(note.content);
  };

  // ✅ Save Edit
  const handleEditSave = async (id) => {
    if (!editedText.trim()) return;
    try {
      await api.updateNote(id, { content: editedText });
      setEditingId(null);
      setEditedText('');
      fetchNotes();
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

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
              background: `url('https://media.tenor.com/IZq6E1Bd4BIAAAAm/butterfly-freedom.webp')`,
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
            }}
          >
            {/* ✅ EDIT MODE */}
            {editingId === note._id ? (
              <>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    padding: 6,
                    border: '1px solid #ccc',
                  }}
                />
                <button
                  className="cute-btn"
                  style={{ marginTop: 6, width: '100%' }}
                  onClick={() => handleEditSave(note._id)}
                >
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <p>{note.content}</p>

                {/* ✅ EDIT BUTTON */}
               <button
  className="continue-application note-edit-btn"
  onClick={() => handleEditStart(note)}
  style={{
    '--color': '#631d63ff',
    }}
>
  <div>
    <div className="pencil"></div>
    <div className="folder">
      <div className="top">
        <svg viewBox="0 0 24 27">
          <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" />
        </svg>
      </div>
      <div className="paper"></div>
    </div>
  </div>
  Edit Note
 
</button>

              </>
            )}

            {/* ✅ DELETE BUTTON */}
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


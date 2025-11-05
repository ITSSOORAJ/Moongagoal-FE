import React, { useState } from 'react';

export default function AddGoalForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().slice(0,10));

  const submit = (e) => {
    e.preventDefault();
    if(!title) return alert('Title required');
    onCreate({ title, description: desc, targetDate });
    setTitle(''); setDesc('');
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="form-group">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Goal title" />
      </div>
      <div className="form-group">
        <input value={targetDate} onChange={e=>setTargetDate(e.target.value)} type="date" />
      </div>
      <div className="form-group">
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optional)"></textarea>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="btn" type="submit">Add Goal</button>
      </div>
    </form>
  );
}

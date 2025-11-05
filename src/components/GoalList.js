import React from 'react';

export default function GoalList({ goals, onUpdate, onDelete }) {
  if(!goals || goals.length === 0) return <div className="card">No goals yet.</div>;
  return (
    <div className="card">
      {goals.map(g => (
        <div className="goal-row" key={g._id}>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{g.title}</div>
            <div className="small">{new Date(g.targetDate).toLocaleDateString()} • {g.description}</div>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <select value={g.status} onChange={(e)=> onUpdate(g._id, { status: e.target.value })}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button className="btn" onClick={() => onDelete(g._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

import React from 'react';

export default function AppreciationModal({ open, onClose, allDone, total, completed }) {
  if(!open) return null;
  return (
    <div className="modal">
      <div className="box">
        <div className="center">
          {allDone ? (
            <>
              <h2>🎉 Amazing!</h2>
              <p>You completed all {total} goal(s) today. Special appreciation! 💫</p>
            </>
          ) : (
            <>
              <h2>Keep Going</h2>
              <p>You completed {completed}/{total} goals today. You're doing great — tomorrow will be better!</p>
            </>
          )}
          <div style={{marginTop:12}}>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

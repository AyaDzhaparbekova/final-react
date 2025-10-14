import React from 'react';

export default function ProgressBar({ progress }) {
  const percent = Math.round(progress * 100);
  return (
    <div className="progress-wrap" aria-hidden>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-label">{percent}%</div>
    </div>
  );
}
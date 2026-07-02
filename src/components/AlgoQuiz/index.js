import React, { useState } from 'react';

export default function AlgoQuiz({ question, options = [], correctAnswer, explanation }) {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div style={{ border: '1px solid #3e3e3e', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', background: 'rgba(255,255,255,0.02)' }}>
      <h4>{question}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        {options.map((opt, index) => {
          let btnStyle = { padding: '0.6rem 1rem', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', border: '1px solid #444', background: 'transparent', color: 'inherit' };
          if (selected !== null) {
            if (index === correctAnswer) btnStyle.background = 'rgba(37, 194, 160, 0.2)';
            else if (selected === index) btnStyle.background = 'rgba(230, 57, 70, 0.2)';
          }
          return (
            <button key={index} style={btnStyle} disabled={selected !== null} onClick={() => { setSelected(index); setShowExplanation(true); }}>
              {opt}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <p style={{ marginTop: '1rem', padding: '0.5rem', borderLeft: '3px solid #2196f3', fontSize: '0.9rem', color: '#aaa' }}>
          💡 <b>Explanation:</b> {explanation}
        </p>
      )}
    </div>
  );
}

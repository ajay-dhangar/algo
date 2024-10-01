import React from 'react';
import './style.css';

export default function Authors({ names }) {
  const authors = names.split(',').map(name => name.trim());
  return (
    <div className="tutorial-tag-wrapper contributors">
      <span className="author-label">
        {authors.length > 1 ? 'Authors: ' : 'Author: '}
      </span>
      <div className="authors-list">
        {authors.map((author, idx) => (
          <span key={idx} className="author-tag tag">
            {author}
          </span>
        ))}
      </div>
    </div>
  );
}

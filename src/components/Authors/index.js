import React from 'react';
import './style.css'

export default function Authors({names}) {
  const authors = names.split(",");
  return (
    <div className="tutorial-tag-wrapper">
      <span style={{fontSize:"18px", fontWeight:"500"}}>{ authors.length > 1 ? "Authors: " : "Author: "}</span>
      { 
        authors.map((author, idx) => {
          return (<span key={idx} className="author-tag tag">{ author }</span>);
        })
      }
    </div>
  )};
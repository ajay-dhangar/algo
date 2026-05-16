import React from "react";

const questions = [
  "Explain Binary Search",
  "What is Merge Sort?",
  "Difference between Stack and Queue",
  "Explain Time Complexity",
  "What is Recursion?",
];

function DSAHelper() {
  return (
  <div
    style={{
      padding: "30px",
      margin: "40px auto",
      maxWidth: "800px",
      borderRadius: "20px",
      background: "linear-gradient(to right, #eef2ff, #f8fafc)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontSize: "2rem",
        marginBottom: "10px",
      }}
    >
      Beginner-Friendly DSA Assistant
    </h2>

    <p
      style={{
        marginBottom: "25px",
        color: "#555",
      }}
    >
      Try asking these questions in the chatbot:
    </p>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      {questions.map((q, index) => (
        <button
          key={index}
          style={{
            padding: "12px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {q}
        </button>
      ))}
    </div>
  </div>
);
}

export default DSAHelper;
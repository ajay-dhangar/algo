import React from "react";
import Layout from "@theme/Layout";
import AlgorithmUseCases from "../components/AlgorithmUseCases";

export default function Applications() {
  return (
    <Layout title="Algorithm Applications">
      <div style={{ padding: "30px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Algorithm Applications & Step-by-Step Guide
        </h1>

        <p
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 40px",
            lineHeight: "1.8",
            color: "#555",
          }}
        >
          Explore real-world applications of algorithms and
          understand how they work step-by-step through an
          interactive beginner-friendly interface.
        </p>

        <AlgorithmUseCases />
      </div>
    </Layout>
  );
}
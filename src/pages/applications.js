import React from "react";
import Layout from "@theme/Layout";
import AlgorithmUseCases from "../components/AlgorithmUseCases";

export default function Applications() {
  return (
    <Layout title="Applications">
      <div style={{ padding: "40px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Algorithm Applications
        </h1>

        <AlgorithmUseCases />
      </div>
    </Layout>
  );
}
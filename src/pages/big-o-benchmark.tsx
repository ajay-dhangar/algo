import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function BigOBenchmarkPage() {
  return (
    <Layout
      title="Big-O Runtime Benchmark Playground"
      description="Pick an algorithm, choose an input size, and watch its actual measured runtime and memory usage in your browser — see why O(n²) matters at scale."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: 1200 }}>
        <div className="text--center margin-bottom--lg">
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
            Big-O Runtime Benchmark Playground
          </h1>
          <p className="text--muted" style={{ fontSize: "1.15rem", maxWidth: 760, margin: "0 auto" }}>
            Big-O notation tells you how an algorithm <em>scales</em> — but it can feel abstract
            until you watch it happen. Pick an algorithm, drag the slider from 10 elements to 1
            million, and this page actually runs your selection in a Web Worker and measures the
            real time and memory it takes.
          </p>
        </div>

        <BrowserOnly fallback={<div className="text--center">Loading playground…</div>}>
          {() => {
            const BenchmarkPlayground = require("../components/BenchmarkPlayground").default;
            return <BenchmarkPlayground />;
          }}
        </BrowserOnly>
      </main>
    </Layout>
  );
}

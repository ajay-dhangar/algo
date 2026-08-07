import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

const RelationshipMapPage: React.FC = () => {
  return (
    <Layout
      title="Algorithm Relationship Map"
      description="An interactive graph showing how Algo's algorithms and data structures relate to each other — prerequisites, specializations, and comparisons."
    >
      <div style={{ padding: "32px 16px 60px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto 24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 34px)",
              fontWeight: 800,
              margin: "0 0 10px",
              color: "var(--ifm-heading-color)",
            }}
          >
            Algorithm Relationship Map
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "var(--ifm-font-color-secondary)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Drag, zoom, and click around. Click a node to see how it connects to everything else —
            e.g. BFS → Topological Sort → Cycle Detection, or Merge Sort compared with Quick Sort.
            Filter by category with the legend, or search by name.
          </p>
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <BrowserOnly fallback={<div style={{ textAlign: "center" }}>Loading map…</div>}>
            {() => {
              const AlgorithmRelationshipMap = require("../../components/AlgorithmRelationshipMap").default;
              return <AlgorithmRelationshipMap />;
            }}
          </BrowserOnly>
        </div>
      </div>
    </Layout>
  );
};

export default RelationshipMapPage;

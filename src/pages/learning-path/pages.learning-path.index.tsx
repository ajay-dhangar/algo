import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

const LearningPathPage: React.FC = () => {
  return (
    <Layout
      title="Diagnostic Quiz — Personalized Learning Path"
      description="Answer a short quiz about what DSA topics you already know, and get a personalized, ordered path through Algo's roadmap."
    >
      <div
        style={{
          minHeight: "70vh",
          padding: "48px 16px 80px",
        }}
      >
        <BrowserOnly fallback={<div style={{ textAlign: "center" }}>Loading quiz…</div>}>
          {() => {
            const DiagnosticQuiz = require("../../components/DiagnosticQuiz").default;
            return <DiagnosticQuiz />;
          }}
        </BrowserOnly>
      </div>
    </Layout>
  );
};

export default LearningPathPage;

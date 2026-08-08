import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import SpacedRepetitionReviewPage from "./quizzes/review";

export default function ReviewPage() {
  return (
    <Layout
      title="Review — Spaced Repetition | Algo"
      description="Review your missed quiz questions on a spaced-repetition schedule."
    >
      <BrowserOnly fallback={<div className="p-8 text-center">Loading review session...</div>}>
        {() => <SpacedRepetitionReviewPage />}
      </BrowserOnly>
    </Layout>
  );
}

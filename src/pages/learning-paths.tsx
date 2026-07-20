import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import LearningPathsSection from "../components/Homepage/LearningPathsSection";

export default function LearningPathsPage() {
  return (
    <Layout
      title="Guided Learning Paths | Algo"
      description="Step-by-step Data Structures & Algorithms roadmaps tailored for programming beginners, DSA learners, placement preparation, and competitive programming."
    >
      <Head>
        <title>Guided Learning Paths | Algo</title>
        <meta
          name="description"
          content="Explore structured learning journeys for Data Structures & Algorithms, from fundamental concepts to advanced competitive programming algorithms."
        />
      </Head>
      <main className="min-h-screen bg-slate-50/50 dark:bg-gray-950">
        <LearningPathsSection />
      </main>
    </Layout>
  );
}

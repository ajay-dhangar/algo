import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

export default function Challenge() {
  const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-01");

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <Layout title="Tree Traversals" description="In this challenge, you will implement different tree traversal algorithms.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

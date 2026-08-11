import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

export default function Challenge() {
  const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-10");

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <Layout title="Serialize and Deserialize Binary Tree" description="In this challenge, you will implement functions to serialize and deserialize a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

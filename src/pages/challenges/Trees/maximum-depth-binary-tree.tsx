import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-02")!;

export default function Challenge() {
  return (
    <Layout title="Maximum Depth of Binary Tree" description="In this challenge, you will implement a function to find the maximum depth of a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

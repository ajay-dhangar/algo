import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-03")!;

export default function Challenge() {
  return (
    <Layout title="Count Leaf Nodes" description="In this challenge, you will implement a function to count the number of leaf nodes in a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

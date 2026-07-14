import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-05")!;

export default function Challenge() {
  return (
    <Layout title="Level Order Traversal" description="In this challenge, you will implement a function to perform level order traversal on a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

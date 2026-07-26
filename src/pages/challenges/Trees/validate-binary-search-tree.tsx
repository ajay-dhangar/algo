import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-07")!;

export default function Challenge() {
  return (
    <Layout title="Validate Binary Search Tree" description="In this challenge, you will implement a function to validate if a binary tree is a valid binary search tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

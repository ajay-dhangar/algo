import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-09")!;

export default function Challenge() {
  return (
    <Layout title="Left and Right View of Binary Tree" description="In this challenge, you will implement functions to find the left and right view of a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

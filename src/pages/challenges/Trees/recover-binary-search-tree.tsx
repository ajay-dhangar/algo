import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-14")!;

export default function Challenge() {
  return (
    <Layout title="Recover Binary Search Tree" description="In this challenge, you will implement a function to recover a binary search tree where two nodes have been swapped by mistake.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

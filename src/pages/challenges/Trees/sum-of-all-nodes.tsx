import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-04")!;

export default function Challenge() {
  return (
    <Layout title="Sum of All Nodes" description="In this challenge, you will implement a function to calculate the sum of all nodes in a binary tree.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

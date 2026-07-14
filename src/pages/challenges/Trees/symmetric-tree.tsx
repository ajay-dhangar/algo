import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-15")!;

export default function Challenge() {
  return (
    <Layout title="Symmetric Tree" description="In this challenge, you will implement a function to determine if a binary tree is symmetric around its center.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

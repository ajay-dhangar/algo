import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallenge";
import TREE_CHALLENGES from "../../../data/treeChallengesData";
import Layout from "@theme/Layout";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-12")!;

export default function Challenge() {
  return (
    <Layout title="Construct Binary Tree from Traversals" description="In this challenge, you will implement a function to construct a binary tree from its inorder and preorder traversals.">
      <TreeChallengeLayout challenge={challenge} />
    </Layout>
  );
}

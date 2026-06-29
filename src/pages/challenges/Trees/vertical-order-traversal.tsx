import React from "react";
import TreeChallengeLayout from "../../../components/TreeChallengeLayout";
import TREE_CHALLENGES from "../../../data/treeChallengesData";

const challenge = TREE_CHALLENGES.find((c) => c.id === "tree-11")!;

export default function Challenge() {
  return <TreeChallengeLayout challenge={challenge} />;
}

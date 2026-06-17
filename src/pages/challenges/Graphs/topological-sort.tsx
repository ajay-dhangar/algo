import React from "react";
import GraphChallengeLayout from "../../../components/GraphChallengeLayout";
import GRAPH_CHALLENGES from "../../../data/graphChallengesData";

const challenge = GRAPH_CHALLENGES.find((c) => c.id === "graph-08")!;

export default function Challenge() {
  return <GraphChallengeLayout challenge={challenge} />;
}

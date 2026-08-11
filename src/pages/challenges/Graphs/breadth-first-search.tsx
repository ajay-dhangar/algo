import React from "react";
import GraphChallengeLayout from "../../../components/GraphChallengeLayout";
import GRAPH_CHALLENGES from "../../../data/graphChallengesData";

export default function Challenge() {
  const challenge = GRAPH_CHALLENGES.find((c) => c.id === "graph-03");

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <GraphChallengeLayout challenge={challenge} />;
}

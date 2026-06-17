import React from "react";
import DPChallengeLayout from "../../../components/DPChallengeLayout";
import DP_CHALLENGES from "../../../data/dpChallengesData";

const challenge = DP_CHALLENGES.find((c) => c.id === "dp-13")!;

export default function Challenge() {
  return <DPChallengeLayout challenge={challenge} />;
}

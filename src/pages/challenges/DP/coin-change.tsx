import React from "react";
import DPChallengeLayout from "../../../components/DPChallengeLayout";
import DP_CHALLENGES from "../../../data/dpChallengesData";

const Challenge = () => {
  const challenge = DP_CHALLENGES.find((c) => c.id === "dp-05");

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <DPChallengeLayout challenge={challenge} />;
};

export default Challenge;

import React from "react";
import DPChallengeLayout from "../../../components/DPChallengeLayout";
import DP_CHALLENGES from "../../../data/dpChallengesData";

/**
 * Renders the dynamic programming challenge page.
 */
const Challenge = () => {
  const challenge = DP_CHALLENGES.find((c) => c.id === "dp-17");

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <DPChallengeLayout challenge={challenge} />;
};

export default Challenge;

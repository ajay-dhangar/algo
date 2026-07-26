import React from 'react';
import GreedyChallengeLayout from '../../../components/GreedyChallengeLayout';
import GREEDY_CHALLENGES from '../../../data/greedyChallengesData';

export default function ChallengePage() {
  const challenge = GREEDY_CHALLENGES.find(c => c.slug === 'activity-selection-problem');
  
  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <GreedyChallengeLayout challenge={challenge} />;
}

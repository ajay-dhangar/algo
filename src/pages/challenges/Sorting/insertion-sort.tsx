import React from 'react';
import SortingChallengeLayout from '../../../components/SortingChallengeLayout';
import SORTING_CHALLENGES from '../../../data/sortingChallengesData';

export default function ChallengePage() {
  const challenge = SORTING_CHALLENGES.find(c => c.slug === 'insertion-sort');
  
  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <SortingChallengeLayout challenge={challenge} />;
}

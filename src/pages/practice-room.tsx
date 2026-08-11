import React from 'react';
import Layout from '@theme/Layout';
import PracticeRoom from '../components/PracticeRoom/PracticeRoom';

export default function PracticeRoomPage(): JSX.Element {
  return (
    <Layout
      title="Practice Rooms — Live Collaborative Coding"
      description="Real-time 1:1 or group coding sessions for mock interviews and pair problem-solving. Share a room code and code together with live editor sync, shared timer, and WebRTC video."
      noFooter
    >
      <PracticeRoom />
    </Layout>
  );
}

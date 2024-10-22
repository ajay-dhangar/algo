// src/pages/Challenges.tsx

import React from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import ChallengeCard from "../../components/ChallengeCard";
import Header from "../../components/Header";
import challengeData from "../../data/challengeData";

const Challenges: React.FC = () => {
  return (
    <Layout
      title="Challenges"
      description="Participate in coding challenges to earn points and rank up."
    >
      <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
        <Header
          title="Coding Challenges"
          description="Push your coding limits by participating in timed coding challenges."
        />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {challengeData.map((challenge, index) => (
            <ChallengeCard
              key={index}
              title={challenge.title}
              description={challenge.description}
              timeLimit={challenge.timeLimit}
              link={challenge.link}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Challenges;

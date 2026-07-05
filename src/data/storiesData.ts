// src/pages/stories/storiesData.ts

export interface Story {
  username: string;
  name: string;
  role: string;
  title: string;
  summary: string;
  tags: string[];
  metric: string;
}

export const INITIAL_STORIES: Story[] = [
  {
    username: "ajay-dhangar",
    name: "Ajay Dhangar",
    role: "Founder & Maintainer",
    title: "Building a Vision from the Ground Up",
    summary:
      "The raw truth about navigating failures, late-night code grinds, and building CodeHarborHub to empower global learners.",
    tags: ["Founder", "Open Source", "Vision"],
    metric: "100+ PRs Reviewed",
  },
  {
    username: "rohan-sharma",
    name: "Rohan Sharma",
    role: "B.Tech Learner",
    title: "Conquering Graph Algorithms After 4 Failures",
    summary:
      "I almost quit coding after struggling with dynamic programming. Finding visual examples changed my entire perspective.",
    tags: ["DSA", "Resilience", "Student"],
    metric: "300+ Problems Solved",
  },
  {
    username: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Core Contributor",
    title: "Overcoming Imposter Syndrome via Git",
    summary:
      "How fixing a minor typo inside documentation opened the doors to fixing core logic bugs in open-source systems.",
    tags: ["Git", "React", "Community"],
    metric: "12 Contributions",
  },
];

export const AVAILABLE_TAGS = [
  "All",
  "Founder",
  "DSA",
  "Open Source",
  "Resilience",
  "React",
];

export interface OpenSourceEvent {
  id: string;
  title: string;
  organizer: string;
  timeline: string;
  status: "active" | "upcoming" | "completed";
  description: string;
  logoUrl?: string;
  contributionType: string;
  rewards: string[];
  actionLink: string;
  actionText: string;
}

export const EVENTS_DATA: OpenSourceEvent[] = [
  {
    id: "gssoc",
    title: "GirlScript Summer of Code",
    organizer: "GirlScript Foundation",
    timeline: "May - August",
    status: "active",
    description: "A three-month-long open-source program designed to introduce beginners to the world of open-source development while collaborating on real-world production codebases.",
    contributionType: "GitHub Pull Requests / Documentation / Core Dev",
    rewards: ["Digital Badges", "Global Leaderboard Rank", "Swag Kits"],
    actionLink: "https://gssoc.girlscript.tech/",
    actionText: "Track Project Repositories"
  },
  {
    id: "hacktoberfest",
    title: "Hacktoberfest",
    organizer: "DigitalOcean & Partners",
    timeline: "October 1 - October 31",
    status: "upcoming",
    description: "The global month-long celebration of open-source software. Developers of all skill levels are encouraged to submit high-quality pull requests to support software infrastructure.",
    contributionType: "Valid GitHub/GitLab Pull Requests across opted-in repositories",
    rewards: ["Official Swags / Tree Planted", "Exclusive Digital Badges"],
    actionLink: "https://hacktoberfest.com/",
    actionText: "View Participation Rules"
  },
  {
    id: "ssoc",
    title: "Social Summer of Code",
    organizer: "Social3 Ecosystem",
    timeline: "June - August",
    status: "upcoming",
    description: "An inclusive open-source program focusing on building web3 applications, decentralized tech, and core algorithmic repositories with intensive community mentoring setups.",
    contributionType: "Algorithm Submissions / UI Enhancements",
    rewards: ["Contributorship Certificates", "Top Performer Cash Prizes"],
    actionLink: "#",
    actionText: "Coming Soon"
  },
  {
    id: "lfx",
    title: "LFX Mentorships",
    organizer: "The Linux Foundation",
    timeline: "Multiple Cohorts Yearly",
    status: "active",
    description: "An elite program matching trained developer minds with critical open-source software projects spanning cloud-native systems, Linux systems, and security infrastructure frameworks.",
    contributionType: "Core Systems Architecture / Enterprise Testing Tools",
    rewards: ["Stipend Funding", "Direct Enterprise Mentorship"],
    actionLink: "https://mentorship.lfx.linuxfoundation.org/",
    actionText: "Browse Active Projects"
  }
];

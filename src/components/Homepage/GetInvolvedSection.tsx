import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import {
  FaCodeBranch,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaUsers,
  FaGraduationCap,
  FaLightbulb,
  FaArrowRight
} from "react-icons/fa";

interface EventItem {
  title: string;
  description: string;
  link?: string;
  icon: React.ReactNode;
  tag: string;
  tagClass: string;
  ctaText: string;
}

const events: EventItem[] = [
  {
    title: "Open Source Contributions",
    description: "Solve open issues, refactor data structures, and optimize complex time complexities in our core algorithm index.",
    link: "https://github.com/ajay-dhangar/algo",
    icon: <FaCodeBranch />,
    tag: "Highly Recommended",
    tagClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    ctaText: "Explore Issues"
  },
  {
    title: "Hackathons",
    description: "Push your limits under tight execution clocks. Build functional prototypes, crush bugs, and win exclusive developer swag.",
    link: "https://hacktoberfest.com/",
    icon: <FaLaptopCode />,
    tag: "Live Event",
    tagClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    ctaText: "Join Hackathon"
  },
  {
    title: "Community Meetups",
    description: "Sync with global maintainers, review system architectures, and showcase your optimization milestones on our networks.",
    link: "https://www.linkedin.com/in/ajay-dhangar/",
    icon: <FaUsers />,
    tag: "Networking",
    tagClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    ctaText: "Connect with Devs"
  },
  {
    title: "Technical Workshops",
    description: "Deep dive into production system designs, binary manipulation, and spatial complexity trade-offs alongside core maintainers.",
    icon: <FaChalkboardTeacher />,
    tag: "Interactive Lessons",
    tagClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    ctaText: "Coming Soon"
  },
  {
    title: "Mentorship Programs",
    description: "Get 1-on-1 code architecture guidance from elite engineers to prepare for technical screenings and whiteboarding panels.",
    icon: <FaLightbulb />,
    tag: "Career Growth",
    tagClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    ctaText: "Join Queue"
  },
  {
    title: "Interactive Courses",
    description: "Progress through systematic algorithmic paradigms, solve rigorous diagnostic tests, and unlock verified completion badges.",
    icon: <FaGraduationCap />,
    tag: "Self-Paced",
    tagClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    ctaText: "Browse Syllabi"
  },
];

// Inner Event Card Layout
const EventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  const CardWrapper = event.link ? Link : "div";

  return (
    <CardWrapper
      to={event.link}
      className={clsx(
        "group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 no-underline hover:no-underline",
        event.link
          ? "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500"
          : "border-slate-200/60 bg-slate-50/50 opacity-75 dark:border-slate-800/40 dark:bg-slate-900/20"
      )}
    >
      <div>
        {/* Card Metadata Top Deck */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-xl text-lg transition-transform group-hover:scale-110",
            event.link
              ? "bg-blue-500/5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
              : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
          )}>
            {event.icon}
          </div>
          <span className={clsx("rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wide uppercase", event.tagClass)}>
            {event.tag}
          </span>
        </div>

        {/* Card Typography */}
        <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {event.description}
        </p>
      </div>

      {/* Dynamic CTA Footer Section */}
      <div className={clsx(
        "inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wide uppercase mt-auto",
        event.link
          ? "text-blue-600 dark:text-blue-400"
          : "text-slate-400 dark:text-slate-600"
      )}>
        <span>{event.ctaText}</span>
        {event.link && <FaArrowRight className="transition-transform group-hover:translate-x-1" />}
      </div>
    </CardWrapper>
  );
};

export default function GetInvolvedSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-20 dark:bg-[#090d16]">
      {/* Background Ambience Accent Blobs */}
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">

        {/* Main Section Header */}
        <div className="text-center mb-16 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-4">
            JOIN THE ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Get Involved  <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Today</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Become part of a highly active sandbox. Pick an entry path below to refine your production engineering toolkit and collaborate with developers worldwide.
          </p>
        </div>

        {/* Responsive Flex/Grid Cards Matrix */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
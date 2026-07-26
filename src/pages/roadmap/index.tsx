import React from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import { 
  FaBrain, 
  FaChartLine, 
  FaTerminal, 
  FaEye, 
  FaMobileAlt, 
  FaCodeBranch, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaFlag, 
  FaCompass 
} from "react-icons/fa";

interface Milestone {
  quarter: string;
  title: string;
  scope: "Core Engine" | "Visualizers" | "Ecosystem" | "Intelligent Layer";
  description: string;
  status: "planned" | "in-progress" | "completed";
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    quarter: "Q1 2026",
    title: "Native Mobile Application Launch",
    scope: "Ecosystem",
    description: "Launch cross-platform iOS and Android frameworks using React Native to offer playground compilers, algorithm execution trees, and notification pipelines for active code challenges.",
    status: "completed",
    icon: <FaMobileAlt />,
  },
  {
    quarter: "Q2 2026",
    title: "Performance Benchmarking Engine",
    scope: "Core Engine",
    description: "Build an isolated testing execution layer enabling developers to check execution speed, memory footprint, and call stack overhead side-by-side across distinct algorithmic methodologies.",
    status: "in-progress",
    icon: <FaChartLine />,
  },
  {
    quarter: "Q3 2026",
    title: "Interactive Space/Time Visualizations",
    scope: "Visualizers",
    description: "Develop structural DOM rendering loops showing exact variable mutations and node shifts for complex graph pathways, sorting pipelines, and complex tree matrices.",
    status: "planned",
    icon: <FaEye />,
  },
  {
    quarter: "Q3 2026",
    title: "Ecosystem Expansion (Go, Rust, Kotlin)",
    scope: "Ecosystem",
    description: "Expand out from Python, JavaScript, and C++ to ship production-ready, type-safe algorithmic variants across modern system languages like Rust, Go, and mobile-first Kotlin architectures.",
    status: "planned",
    icon: <FaTerminal />,
  },
  {
    quarter: "Q4 2026",
    title: "Agentic AI Code Assistant Integration",
    scope: "Intelligent Layer",
    description: "Embed localized Large Language Model assistance directly into our workspace structures to offer automated performance critiques, dynamic structural hints, and tailored learning paths.",
    status: "planned",
    icon: <FaBrain />,
  },
  {
    quarter: "Q1 2027",
    title: "Decentralized Peer Code Review Network",
    scope: "Core Engine",
    description: "Deploy an in-app matching protocol letting open-source contributors evaluate live algorithmic implementations, creating verifiable proof-of-skill records directly in the learner's terminal.",
    status: "planned",
    icon: <FaCodeBranch />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Roadmap: React.FC = () => {
  const getStatusMeta = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return { text: "Completed", classes: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", icon: <FaCheckCircle /> };
      case "in-progress":
        return { text: "In Progress", classes: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 animate-pulse", icon: <FaHourglassHalf /> };
      case "planned":
        return { text: "Planned", classes: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", icon: <FaFlag /> };
    }
  };

  const getScopeBadgeColor = (scope: Milestone["scope"]) => {
    switch (scope) {
      case "Core Engine": return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15";
      case "Visualizers": return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/15";
      case "Ecosystem": return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/15";
      case "Intelligent Layer": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/15";
    }
  };

  return (
    <Layout title="Engineering Roadmap" description="Track the architectural development trajectory and milestone releases planned for the Algo platform.">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-32">
        
        {/* --- ROADMAP BRANDING HERO SECTION --- */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-solid border-slate-200 dark:border-slate-800/80 py-24 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.08),transparent_60%)]" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase border border-solid border-indigo-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaCompass className="text-xs" /> Platform Trajectory
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white m-0 tracking-tight uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Architectural <span className="text-[var(--ifm-color-primary)]">Roadmap</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Transparent development telemetry. Explore upcoming module launches, computer science visualizer updates, and core platform optimizations down the development pipeline.
            </motion.p>
          </div>
        </section>

        {/* --- VERTICAL PIPELINE TIMELINE MATRIX --- */}
        <section className="max-w-6xl mx-auto px-4 mt-20 relative">
          
          {/* Central Connecting Timeline Spinal Column */}
          <div className="absolute left-8 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-200 dark:to-slate-800 transform md:-translate-x-1/2" />

          <motion.div 
            className="space-y-12 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {milestones.map((milestone, index) => {
              const statusMeta = getStatusMeta(milestone.status);
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} md:mb-16 relative w-full`}>
                  
                  {/* Outer Content Wing Boundary */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-10">
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-slate-900/40 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md backdrop-blur-xs relative group transition-all"
                    >
                      {/* Responsive Timeline Connector Accent Pointers */}
                      <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-slate-900 border-t border-solid border-slate-200 dark:border-slate-800/80 transform rotate-45 z-10 ${
                        isEven ? "-left-2 border-l" : "-right-2 border-r"
                      }`} />

                      {/* Header Stack Meta Element Block */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="text-xs font-mono font-black text-[var(--ifm-color-primary)] bg-[var(--ifm-color-primary)]/5 px-2.5 py-1 rounded-md border border-solid border-[var(--ifm-color-primary)]/10 uppercase tracking-wider">
                          {milestone.quarter}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-solid ${getScopeBadgeColor(milestone.scope)}`}>
                            {milestone.scope}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-solid ${statusMeta.classes}`}>
                            {statusMeta.icon}
                            {statusMeta.text}
                          </span>
                        </div>
                      </div>

                      {/* Title Segment Block */}
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-solid border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 text-sm shrink-0 shadow-inner group-hover:text-[var(--ifm-color-primary)] transition-colors">
                          {milestone.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white m-0 tracking-tight leading-snug pt-1">
                          {milestone.title}
                        </h3>
                      </div>

                      {/* Description Narrative Paragraph */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-sans font-medium">
                        {milestone.description}
                      </p>

                    </motion.div>
                  </div>

                  {/* Absolute Timeline Central Hub Anchor Interface Node */}
                  <div className="absolute left-5 md:left-1/2 top-6 md:top-8 w-6 h-6 rounded-full border-4 border-solid border-slate-50 dark:border-[#0b0f19] bg-white dark:bg-slate-900 shadow-md flex items-center justify-center transform -translate-x-1/2 z-20 transition-all duration-300 group-hover:scale-110">
                    <div className={`w-2 h-2 rounded-full ${
                      milestone.status === "completed" ? "bg-emerald-500" : milestone.status === "in-progress" ? "bg-amber-500 animate-ping" : "bg-indigo-500"
                    }`} />
                  </div>

                </div>
              );
            })}
          </motion.div>

        </section>
      </div>
    </Layout>
  );
};

export default Roadmap;
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import { 
  FaBook, 
  FaGlobe, 
  FaGraduationCap, 
  FaMapSigns, 
  FaLaptopCode, 
  FaEye, 
  FaExternalLinkAlt 
} from "react-icons/fa";

type ResourceType = "Book" | "Website" | "Course" | "Roadmap" | "Practice" | "Interview Prep" | "Video Resources";

interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  description: string;
  link: string;
  actionText: string;
}

const resources: Resource[] = [
  { 
    id: 1, 
    title: "Introduction to Algorithms by CLRS", 
    type: "Book", 
    description: "The gold standard of algorithmic academia. Deep analytical breakdowns of computational logic and time complexities.", 
    link: "https://drive.google.com/file/d/0B3RHrbxFb7PfYjk4ZG01Z3lrbnc/view?resourcekey=0-aHyhqxUeXCNvRK3_QfNurg",
    actionText: "Read Document"
  },
  { 
    id: 2, 
    title: "LeetCode Practice Matrix", 
    type: "Website", 
    description: "Industry-standard arena for real-time algorithmic problem processing spanning multiple difficulties and structural data frameworks.", 
    link: "https://leetcode.com",
    actionText: "Launch Workspace"
  },
  { 
    id: 3, 
    title: "Coursera: Algorithmic Toolbox", 
    type: "Course", 
    description: "Highly structured educational path breaking down core computer science design sorting sequences and recursion routines.", 
    link: "https://www.coursera.org/learn/algorithms-part1",
    actionText: "Enroll In Course"
  },
  {
    id: 4,
    title: "Striver A2Z DSA Sheet",
    type: "Roadmap",
    description: "A comprehensive, step-by-step master roadmap packed with step-by-step challenges and detailed explanation logs.",
    link: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
    actionText: "Explore Sheets"
  },
  {
    id: 5,
    title: "NeetCode 150 Tracker",
    type: "Practice",
    description: "A carefully curated set of 150 pattern-focused problems engineered to build pattern recognition fast.",
    link: "https://neetcode.io/practice/practice",
    actionText: "Start Preparation"
  },
  {
    id: 6,
    title: "VisuAlgo Node Simulation",
    type: "Website",
    description: "Live interactive animations of complex data structure node shifts and algorithmic memory executions.",
    link: "https://visualgo.net/en",
    actionText: "Open Visualizer"
  },
  {
    id: 7,
    title: "Blind 75 Curated Blueprint",
    type: "Interview Prep",
    description: "The classic, condensed problem set isolating critical computational patterns needed for technical interviews.",
    link: "https://www.techinterviewhandbook.org/best-practice-questions/",
    actionText: "Review Blueprint"
  },
  {
    id: 8,
    title: "Premium DSA Video Repositories",
    type: "Video Resources",
    description: "Curated array of conceptual video series visually exploring abstract pointer structures and dynamic algorithms.",
    link: "https://drive.google.com/file/d/17RKMqk5KT-1hf4O8wM4VssV_WrG4L7RX/view",
    actionText: "Stream Playlists"
  },
];

const CATEGORIES: ("All" | ResourceType)[] = [
  "All", "Book", "Roadmap", "Practice", "Interview Prep", "Website", "Course", "Video Resources"
];

const getCategoryIcon = (type: ResourceType) => {
  switch (type) {
    case "Book": return <FaBook className="text-emerald-500" />;
    case "Website": return <FaGlobe className="text-blue-500" />;
    case "Course": return <FaGraduationCap className="text-indigo-500" />;
    case "Roadmap": return <FaMapSigns className="text-amber-500" />;
    case "Practice": return <FaLaptopCode className="text-purple-500" />;
    case "Interview Prep": return <FaEye className="text-rose-500" />;
    case "Video Resources": return <FaExternalLinkAlt className="text-cyan-500" />;
  }
};

const getBadgeStyles = (type: ResourceType) => {
  switch (type) {
    case "Book": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60";
    case "Website": return "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200/60";
    case "Course": return "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200/60";
    case "Roadmap": return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60";
    case "Practice": return "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200/60";
    case "Interview Prep": return "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200/60";
    case "Video Resources": return "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200/60";
  }
};

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | ResourceType>("All");

  const filteredResources = useMemo(() => {
    if (activeTab === "All") return resources;
    return resources.filter(r => r.type === activeTab);
  }, [activeTab]);

  return (
    <Layout title="Developer Resources" description="Curated master indexes, diagnostic toolkits, and educational roadmaps for algorithms.">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 pb-32">
        
        {/* --- HERO BANNER SECTION --- */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-solid border-slate-200 dark:border-slate-800/80 py-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(99,102,241,0.06),transparent_50%)]" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <motion.h1
              className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight m-0 uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Curated <span className="text-[var(--ifm-color-primary)]">Knowledge</span> Vault
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Skip the noise. Hand-picked educational portals, preparation spreadsheets, and visual interactive playgrounds optimized to accelerate algorithmic code masteries.
            </motion.p>
          </div>
        </section>

        {/* --- DYNAMIC FILTER CONTROLS TABS BAR --- */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="flex overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none border-b border-solid border-slate-200 dark:border-slate-800/60 gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide border border-solid transition-all whitespace-nowrap min-h-[38px] cursor-pointer ${
                    isActive
                      ? "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white shadow-sm"
                      : "border-transparent bg-transparent text-slate-500 dark:text-slate-400 hover:text-[var(--ifm-color-primary)] dark:hover:text-white"
                  }`}
                >
                  {cat === "All" ? "All Compendiums" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- ANCHORED RESOURCE GRID MASONRY --- */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredResources.map((res) => (
                <motion.div
                  layout
                  key={res.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Top Meta Details Layer Row */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-sm shadow-inner shrink-0">
                        {getCategoryIcon(res.type)}
                      </div>
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border border-solid shrink-0 ${getBadgeStyles(res.type)}`}>
                        {res.type}
                      </span>
                    </div>

                    {/* Structural Heading Accent */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0 tracking-tight leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors">
                      {res.title}
                    </h3>

                    {/* Comprehensive Explanatory Text block */}
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6 leading-relaxed m-0 font-medium">
                      {res.description}
                    </p>
                  </div>

                  {/* Clean Navigation Button Interaction Interface */}
                  <a
                    href={res.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-none bg-slate-100 hover:bg-[var(--ifm-color-primary)] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-bold transition-all cursor-pointer no-underline group/btn min-h-[42px]"
                  >
                    {res.actionText}
                    <span className="transition-transform duration-200 transform group-hover/btn:translate-x-1 font-sans">
                      →
                    </span>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>
    </Layout>
  );
};

export default Resources;
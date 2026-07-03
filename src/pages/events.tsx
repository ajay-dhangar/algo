import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaCodeBranch, 
  FaGlobe, 
  FaAward, 
  FaExternalLinkAlt, 
  FaRocket,
  FaCheckCircle,
  FaHourglassHalf
} from "react-icons/fa";

import { EVENTS_DATA } from "../data/events";

const OpenSourceEvents: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "upcoming">("all");

  const filteredEvents = EVENTS_DATA.filter(event => {
    if (activeFilter === "all") return true;
    return event.status === activeFilter;
  });

  return (
    <Layout
      title="Open Source Events Hub"
      description="Join global open-source events, hackathons, and contribution sprints alongside the Algo ecosystem."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-24">
        
        {/* --- HERO BRANDING SECTION --- */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 py-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.02),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase border border-indigo-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaCodeBranch className="text-xs" /> Contribution Ecosystem
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white m-0 tracking-tight uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Open Source <span className="text-[var(--ifm-color-primary)]">Events Hub</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed m-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Accelerate your learning tree. Collaborate on global software pipelines through seasonal hackathons, interactive open-source programs, and community-led execution sprints.
            </motion.p>
          </div>
        </section>

        {/* --- DYNAMIC FILTER MATRIX CONTROLS --- */}
        <section className="max-w-7xl mx-auto px-4 mt-12">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 pb-4 mb-8 md:flex-row flex-col gap-4">
            <div className="flex gap-2">
              {(["all", "active", "upcoming"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-200 ${
                    activeFilter === tab
                      ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 font-black"
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {tab} programs
                </button>
              ))}
            </div>
            
            <span className="text-xs font-mono text-slate-400">
              // Active Nodes Selected: {filteredEvents.length}
            </span>
          </div>

          {/* --- EVENTS DATA MATRIX LIST --- */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/70 rounded-xl p-6 md:p-8 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  {/* Absolute Status Tracking Accent Line */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    event.status === 'active' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`} />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pl-2">
                    
                    {/* Left Meta Tree Block */}
                    <div className="space-y-4 max-w-3xl">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white m-0 tracking-tight">
                            {event.title}
                          </h2>
                          
                          {/* Status Badge */}
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                            event.status === "active" 
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          }`}>
                            {event.status === "active" ? <FaCheckCircle /> : <FaHourglassHalf />}
                            {event.status}
                          </span>
                        </div>
                        
                        <p className="text-xs font-mono text-slate-400 dark:text-slate-500 m-0 font-semibold tracking-wide">
                          Hosted by {event.organizer} &bull; Timeline: <span className="text-slate-700 dark:text-slate-300">{event.timeline}</span>
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-sans">
                        {event.description}
                      </p>

                      {/* Technical Blueprint Metadata Rules */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/40 rounded-lg p-3.5">
                          <span className="font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">// CONTRIBUTION PATHWAYS</span>
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <FaCodeBranch className="text-indigo-400 shrink-0" /> {event.contributionType}
                          </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/40 rounded-lg p-3.5">
                          <span className="font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">// REWARDS STACK</span>
                          <div className="flex flex-wrap gap-1.5">
                            {event.rewards.map((reward, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                                <FaAward className="text-amber-500 text-[10px]" /> {reward}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Link Target Access Button */}
                    <div className="shrink-0 pt-2 md:pt-0 self-end md:self-start">
                      <Link
                        to={event.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:no-underline transition-all group/btn"
                      >
                        <span>{event.actionText}</span>
                        <FaExternalLinkAlt className="text-[10px] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-slate-400 group-hover/btn:text-indigo-400" />
                      </Link>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- TERMINAL REPO CONTRIBUTOR NOTICE CARD --- */}
          <motion.div 
            className="mt-16 bg-slate-900 text-slate-200 rounded-xl p-6 shadow-xl border border-slate-800 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white m-0 uppercase tracking-tight flex items-center gap-2 font-mono">
                  <FaRocket className="text-indigo-400 animate-bounce" /> Add Your Program Pipeline
                </h4>
                <p className="text-slate-400 font-sans leading-relaxed m-0">
                  Are you managing a regional open-source cohort or an international hackathon grid sprint? Open an issue parameter directly inside our Algo core repo structure to link up.
                </p>
              </div>
              
              <Link
                to="https://github.com/ajay-dhangar/algo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono font-bold bg-white text-slate-950 hover:bg-slate-100 px-4 py-2.5 rounded-lg transition-all hover:no-underline whitespace-nowrap"
              >
                git commit event
              </Link>
            </div>
          </motion.div>

        </section>
      </div>
    </Layout>
  );
};

export default OpenSourceEvents;
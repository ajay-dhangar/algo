import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaDatabase,
  FaUsers,
  FaGithub,
  FaLock,
  FaTerminal,
  FaInfoCircle,
} from "react-icons/fa";

const PrivacyPolicy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("collect");

  const tabOptions = [
    { id: "collect", label: "Data Collected", icon: <FaDatabase /> },
    { id: "use", label: "How We Use It", icon: <FaUsers /> },
    { id: "security", label: "Security Stack", icon: <FaLock /> },
  ];

  return (
    <Layout
      title="Privacy Policy"
      description="Learn how Algo collects, uses, and protects your open-source data footprints."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#080b11] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-16">
        
        {/* --- HERO BRANDING MANIFESTO --- */}
        <section className="relative overflow-hidden bg-slate-100 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/60 py-16 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,179,8,0.03),transparent)]" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold tracking-wider uppercase mb-6 border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaShieldAlt className="text-xs" /> Platform Security Core
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white m-0 mb-6 tracking-tight uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PRIVACY <span className="text-[var(--ifm-color-primary)]">POLICY</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              At Algo, transparency isn't just a legal requirement—it’s built right into our open-source DNA. Explore exactly how your developer profile records are managed.
            </motion.p>
          </div>
        </section>

        {/* --- MAIN INTERACTIVE CORE --- */}
        <section className="max-w-4xl mx-auto px-4 mt-12">
          
          {/* ABOUT ALGO INTRO MESH */}
          <motion.div 
            className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-3 bg-blue-500/10 text-[var(--ifm-color-primary)] rounded-lg text-xl shrink-0">
              <FaInfoCircle />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0 mb-2">Platform Context</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-sans">
                Algo is a collaborative ecosystem designed using Docusaurus, React, and MDX. Our core mission is helping engineers optimize algorithms, refine logic structures, and contribute cleanly back to collective public trees.
              </p>
            </div>
          </motion.div>

          {/* INTERACTIVE CONTROLS SWITCHER */}
          <div className="flex border-b border-slate-200 dark:border-slate-800/60 gap-2 mb-6">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer bg-transparent ${
                  activeTab === tab.id
                    ? "border-[var(--ifm-color-primary)] text-[var(--ifm-color-primary)] font-black"
                    : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* DYNAMIC TAB INTERFACE PANELS */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {activeTab === "collect" && (
                <motion.div
                  key="collect"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase">// DATA_NODE_RECORDS</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Public GitHub Metadata", desc: "Basic identity elements, commits, and visible pull request histories mapping into repository statistics." },
                      { title: "Activity Telemetry", desc: "Anonymized diagnostic browser parameters, language selections, and specific execution route performance analytics." },
                      { title: "Community Logs", desc: "Voluntary form text fields, issue discussions, or optimization feedback points submitted through explicit pipelines." },
                      { title: "Session Cookies", desc: "Local device browser preferences to remember configurations like persistent code display or native dark mode toggle choices." }
                    ].map((item, index) => (
                      <div key={index} className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 p-5 rounded-xl shadow-2xs">
                        <div className="font-black uppercase text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)]" /> {item.title}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-sans">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "use" && (
                <motion.div
                  key="use"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 rounded-xl p-6"
                >
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">// EXECUTION_OBJECTIVES</div>
                  <div className="space-y-3.5">
                    {[
                      "Refining and structuring algorithmic educational assets based on interaction densities.",
                      "Highlighting explicit open-source contributor accomplishments within global dashboards.",
                      "Debugging web interface exceptions to maintain safe framework performance thresholds.",
                      "Optimizing micro-layout configurations to establish consistent responsive behavior rules."
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-sans">
                        <span className="font-mono text-[var(--ifm-color-primary)] font-bold">0{index + 1}.</span>
                        <p className="m-0 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 rounded-xl p-6">
                    <div className="font-black uppercase text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <FaLock className="text-[var(--ifm-color-primary)]" /> Authentication Strategy
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-sans">
                      Algo does not maintain native credential tables or process sensitive password strings directly. By leveraging secure OAuth authentication pipelines managed entirely via GitHub, user profile access permissions remain safely decoupled from platform storage frameworks.
                    </p>
                  </div>

                  <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6">
                    <div className="font-black text-amber-800 dark:text-amber-400 uppercase mb-2 flex items-center gap-2">
                      <FaGithub /> Public Repository Footprints
                    </div>
                    <p className="text-amber-700 dark:text-amber-500/80 m-0 leading-relaxed font-sans">
                      Because codebases are hosted publicly, pull requests, branch histories, and linked issue dialogs are native global architectural configurations. We heavily encourage developers to exclude sensitive identity identifiers when pushing patches.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- TERMINAL CALL-TO-ACTION CARD --- */}
          <motion.div 
            className="mt-12 bg-slate-900 text-slate-200 rounded-xl p-6 shadow-xl border border-slate-800 relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 p-4 text-slate-800/40 text-7xl font-mono pointer-events-none select-none">
              <FaTerminal />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h4 className="text-base font-bold text-white m-0 mb-2 uppercase tracking-tight flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> operational_inquiries
              </h4>
              <p className="text-slate-400 font-sans leading-relaxed m-0 mb-6">
                Have architectural concerns regarding pipeline security or user record compliance? Track compliance logic instantly or start an infrastructure query directly inside the official repository.
              </p>
              
              <Link
                to="https://github.com/ajay-dhangar/algo"
                className="inline-flex items-center gap-2 font-mono font-bold bg-white text-slate-950 hover:bg-slate-100 px-4 py-2.5 rounded-lg transition-all hover:no-underline"
              >
                <FaGithub /> git checkout repository
              </Link>
            </div>
          </motion.div>

        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
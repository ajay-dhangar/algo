import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaTerminal, FaCode, FaServer, FaShieldAlt } from "react-icons/fa";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <Layout
      title="System Diagnostics - Core Mission"
      description="Explore the architecture behind Algo and the core team pushing updates to production."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#040414] text-slate-900 dark:text-slate-100 font-mono relative overflow-hidden transition-colors duration-300">
        
        {/* Dynamic Matrix/Grid Network Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(234,179,8,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,179,8,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Radial Ambient Core Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 dark:bg-[var(--ifm-color-primary)]/5 rounded-full filter blur-[120px] pointer-events-none" />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-12 px-4 mx-auto text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-[11px] font-bold tracking-widest uppercase text-[var(--ifm-color-primary)] shadow-sm backdrop-blur-md mb-6"
          >
            <FaTerminal className="text-xs animate-pulse" />
            <span>sys.status == operational</span>
          </motion.div>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase m-0 mb-6">
            ABOUT <span className="text-[var(--ifm-color-primary)] transition-colors duration-300">ALGO</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed m-0 mb-8">
            Algo is an environment optimized for engineers to analyze data structure workflows, build high-performance logic paths, and deploy reliable contributions to decentralized networks.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/docs/"
              className="bg-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-primary-dark)] text-white dark:text-slate-950 font-black text-xs tracking-widest uppercase px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:no-underline border-0 cursor-pointer hover:text-white dark:hover:text-slate-950"
            >
              ACCESS DOCUMENTATION //
            </Link>
          </div>
        </section>

        {/* --- GRID SYSTEM ARCHITECTURE --- */}
        <section className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* The Manifest Terminal Card */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-sm">
              <div>
                <div className="text-[var(--ifm-color-primary)] text-xs font-bold tracking-widest uppercase mb-3">// ARCHITECTURE_MANIFESTO</div>
                <h2 className="text-2xl font-black uppercase tracking-tight m-0 mb-4 text-slate-900 dark:text-white">
                  Optimized Knowledge Pipelines
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0 mb-4">
                  Traditional learning structures remain locked within isolated systems. Algo re-routes this standard by rendering runtime logic transparent, predictable, and fully community-driven.
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  Every pipeline configuration, optimization algorithm, and modular structure listed here remains open-source. This ensures that software engineering foundations remain accessible to everyone.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800/60 pt-6 mt-6 text-center">
                <div>
                  <div className="text-lg font-black text-[var(--ifm-color-primary)]">100%</div>
                  <div className="text-[12px] uppercase tracking-wider text-slate-400">Open Source</div>
                </div>
                <div>
                  <div className="text-lg font-black text-[var(--ifm-color-primary)]">🚀</div>
                  <div className="text-[12px] uppercase tracking-wider text-slate-400">High Speed</div>
                </div>
                <div>
                  <div className="text-lg font-black text-[var(--ifm-color-primary)]">&lt;/&gt;</div>
                  <div className="text-[12px] uppercase tracking-wider text-slate-400">Dev Centric</div>
                </div>
              </div>
            </div>

            {/* Visual Terminal Canvas */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 flex flex-col shadow-sm">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/60">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-slate-400 ml-2 font-mono">mission_payload.log</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between font-mono text-xs text-slate-500 dark:text-slate-400 space-y-4 bg-slate-50/50 dark:bg-slate-950">
                <div className="space-y-1">
                  <div className="text-[var(--ifm-color-primary)]"># Executing platform synthesis...</div>
                  <div>&gt; Syncing repository parameters... OK</div>
                  <div>&gt; Instantiating framework network modules... OK</div>
                </div>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-900">
                  <img
                    src="/algo/images/mission.jpg"
                    alt="System Architecture Core"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- OPERATIONAL CREW SECTION --- */}
        <section className="max-w-7xl mx-auto py-16 px-4 relative z-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="text-[var(--ifm-color-primary)] text-xs font-bold tracking-widest uppercase mb-1">// CORE_OPERATIONAL_NODES</div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase m-0 text-slate-900 dark:text-white">
                MEET THE CREW
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 tracking-wide font-sans m-0">
              System architects actively configuring platform infrastructure and modular repositories.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* NODE 01 [LEAD APPARATUS]: FOUNDER CARD (Spans across full row width or partial layout) */}
            <motion.div 
              variants={cardVariants} 
              className="md:col-span-12 lg:col-span-6 bg-white dark:bg-slate-900/30 border-2 border-[var(--ifm-color-primary)] dark:border-[var(--ifm-color-primary)]/40 rounded-2xl p-6 relative group transition-all duration-300 shadow-md"
            >
              <div className="absolute top-3 right-4 font-mono text-[9px] bg-[var(--ifm-color-primary)] text-white dark:text-slate-950 px-2 py-0.5 rounded font-bold tracking-widest uppercase">
                NODE_01 // ROOT
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 shrink-0 rounded-xl border border-slate-200 dark:border-slate-700/60 p-1 bg-slate-50 dark:bg-slate-900 group-hover:scale-102 transition-transform duration-300">
                  <img
                    className="w-full h-full rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    src="/algo/images/team-member-1.jpg"
                    alt="Ajay Dhangar"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "https://github.com/ajay-dhangar.png"; }}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-1">
                    Ajay Dhangar
                  </h3>
                  <div className="text-xs font-bold text-[var(--ifm-color-primary)] tracking-widest uppercase mb-3">
                    FOUNDER & LEAD ARCHITECT
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed m-0 mb-4">
                    Orchestrates systemic roadmap operations, maps structural algorithms, and reviews structural changes across production workflows.
                  </p>
                  
                  <div className="flex justify-center sm:justify-start gap-4 text-slate-400 dark:text-slate-600">
                    <Link to="https://github.com/ajay-dhangar" className="hover:text-slate-900 dark:hover:text-white transition-colors"><FaGithub className="w-4 h-4" /></Link>
                    <Link to="https://linkedin.com/in/ajay-dhangar" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><FaLinkedin className="w-4 h-4" /></Link>
                    <Link to="https://twitter.com/CodesWithAjay" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><FaTwitter className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* NODE 02: JANE DOE */}
            <motion.div 
              variants={cardVariants} 
              className="md:col-span-6 lg:col-span-3 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-5 text-center relative group transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl border border-slate-200 dark:border-slate-800/80 p-1 bg-slate-50 dark:bg-slate-950 group-hover:scale-102 transition-transform duration-300">
                  <img
                    className="w-full h-full rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all"
                    src="/algo/images/team-member-2.jpg"
                    alt="Jane Doe"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=Jane`; }}
                  />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase m-0 tracking-tight">
                  Jane Doe
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase m-0 mb-3">
                  CHIEF TECH OFFICER
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed m-0 mb-4">
                  Manages internal system latency and coordinates optimization releases.
                </p>
              </div>
              <div className="flex justify-center space-x-4 border-t border-slate-100 dark:border-slate-800/60 pt-3 text-slate-400 dark:text-slate-600">
                <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><FaGithub className="w-3.5 h-3.5" /></Link>
                <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><FaLinkedin className="w-3.5 h-3.5" /></Link>
              </div>
            </motion.div>

            {/* NODE 03: JOHN SMITH */}
            <motion.div 
              variants={cardVariants} 
              className="md:col-span-6 lg:col-span-3 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-5 text-center relative group transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl border border-slate-200 dark:border-slate-800/80 p-1 bg-slate-50 dark:bg-slate-950 group-hover:scale-102 transition-transform duration-300">
                  <img
                    className="w-full h-full rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all"
                    src="/algo/images/team-member-3.jpg"
                    alt="John Smith"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=John`; }}
                  />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase m-0 tracking-tight">
                  John Smith
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase m-0 mb-3">
                  LEAD DEVELOPER
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed m-0 mb-4">
                  Constructs layout configurations and monitors operational pull requests.
                </p>
              </div>
              <div className="flex justify-center space-x-4 border-t border-slate-100 dark:border-slate-800/60 pt-3 text-slate-400 dark:text-slate-600">
                <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><FaGithub className="w-3.5 h-3.5" /></Link>
                <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><FaLinkedin className="w-3.5 h-3.5" /></Link>
              </div>
            </motion.div>

          </motion.div>
        </section>

      </div>
    </Layout>
  );
};

export default About;
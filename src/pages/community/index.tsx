import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { 
  MessageSquare, 
  Globe, 
  GitBranch, 
  Users, 
  Terminal, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react";

// Precise structural animation parameters
const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

const Community: React.FC = () => {
  return (
    <Layout
      title="Community Ecosystem"
      description="Connect with engineers, access open-source project paths, and scale your tech stack knowledge."
    >
      <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 antialiased relative overflow-hidden pb-40 transition-colors duration-200">
        
        {/* Subtle engineering line grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* ================= HERO SECTION ================= */}
        <header className="relative z-10 max-w-8xl mx-auto pt-28 px-6 sm:px-8 lg:px-12 mb-20">
          <div className="max-w-3xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 mb-6"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>Network Infrastructure Active</span>
            </motion.div>

            <motion.h1
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6"
            >
              The engineer's hub for <br />
              <span className="text-slate-400 dark:text-slate-500">collaborative development.</span>
            </motion.h1>

            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-normal"
            >
              Skip isolation. Step into shared development pipelines, claim open tasks, audit technical platforms, and contribute directly alongside engineers around the world.
            </motion.p>
          </div>
        </header>

        {/* ================= INTERACTION ECOSYSTEM GRID ================= */}
        <section className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Primary Cell: Real-Time Sync Communication (Discord Link) */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="lg:col-span-8 flex flex-col justify-between bg-slate-50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-neutral-800/60 rounded-2xl p-8 sm:p-10 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors duration-200 shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-8">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 dark:text-white tracking-tight mb-3">
                  Discord Sync Channel
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mb-12">
                  Our core communication engine. Access specialized tech-stack streams, review pull requests with peers, join scheduled developer roundtables, and clear architecture roadblocks instantly.
                </p>
              </div>

              <Link
                to="https://discord.gg/SbumDQrSJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 text-sm font-medium transition-colors w-full sm:w-auto self-start border-none no-underline"
              >
                Join Workspace <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Secondary Cell: Live Operational Metrics Data */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="lg:col-span-4 flex flex-col justify-between bg-slate-50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-neutral-800/60 rounded-2xl p-8 shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-8">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white tracking-tight mb-6">
                  Community Operations
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Users className="w-6 h-8" />, count: "12k+", label: "Active Platform Engineers" },
                  { icon: <GitBranch className="w-6 h-8" />, count: "450+", label: "Production Contributions" }
                ].map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b border-slate-200/60 dark:border-neutral-800/60 pb-4 last:border-none last:pb-0">
                    <div className="text-slate-400 dark:text-slate-500">
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{metric.count}</div>
                      <div className="text-slate-500 dark:text-slate-400">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row Cell 1: Repository Space (GitHub Contribution Vector) */}
            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="lg:col-span-4 group flex flex-col justify-between bg-slate-50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-neutral-800/60 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors duration-200 shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-8">
                  <FaGithub className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Open Source Matrix
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Claim issue tickets, refactor outdated component libraries, or submit technical documentation modifications.
                </p>
              </div>
              <Link
                to="https://github.com/ajay-dhangar/algo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:no-underline no-underline"
              >
                Inspect Repositories →
              </Link>
            </motion.div>

            {/* Bottom Row Cell 2: Async Knowledge Base Discussions */}
            <motion.div
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="lg:col-span-4 group flex flex-col justify-between bg-slate-50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-neutral-800/60 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors duration-200 shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-8">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Long-Form Threads
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Propose system RFC modules, deep-dive into application architecture setups, or draft long-form educational patterns.
                </p>
              </div>
              <Link
                to="https://github.com/ajay-dhangar/algo/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:no-underline no-underline"
              >
                Browse Discussions →
              </Link>
            </motion.div>

            {/* Bottom Row Cell 3: Quality Standards & Code of Conduct Box */}
            <motion.div
              custom={0.7}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="lg:col-span-4 flex flex-col justify-between bg-slate-50 dark:bg-neutral-900/20 border border-dashed border-slate-200 dark:border-neutral-800 p-8 rounded-2xl"
            >
              <div>
                <div className="flex items-center gap-2 text-slate-400 dark:text-neutral-500 mb-4">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold tracking-wider uppercase">Operational Code</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 m-0">
                  Every shared space is actively maintained to prioritize peer mentoring, thorough code-reviews, and healthy workspace collaboration. We enforce strict parameters for toxic behavior.
                </p>
              </div>
              <div className="text-slate-400 dark:text-neutral-600 font-mono tracking-wider mt-6">
                SYSTEM CHARTER // VERIFIED
              </div>
            </motion.div>

          </div>
        </section>

      </main>
    </Layout>
  );
};

export default Community;
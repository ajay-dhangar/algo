import React from "react";
import Layout from "@theme/Layout";
import FintechExecutionConsole from "../components/Sponsors/FintechExecutionConsole";
import { FaTerminal, FaServer, FaCodeBranch } from "react-icons/fa";

const SponsorsPage: React.FC = () => {
  return (
    <Layout 
      title="Patrons & Infrastructure Backers" 
      description="Verified network logs of enterprise organizations backing the open source ecosystem."
    >
      <main className="relative min-h-screen bg-slate-50 dark:bg-[#060612] overflow-hidden selection:bg-[var(--ifm-color-primary)]/30 selection:text-current">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="mx-auto px-4 py-12 md:py-20 relative z-10">      
          <div className="max-w-5xl mx-auto text-center md:text-left mb-12 md:mb-4 border-b border-slate-200/60 dark:border-zinc-800/50 pb-10">
            
            {/* Live Telemetry System Badges */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400">
                <FaTerminal className="text-[9px] text-[var(--ifm-color-primary)]" /> System: Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <FaServer className="text-[9px]" /> Nodes: Synchronized
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                <FaCodeBranch className="text-[9px]" /> Network: Mainnet
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-zinc-50 tracking-tight m-0 uppercase font-sans">
              Patrons & <span className="text-[var(--ifm-color-primary)]">Infrastructure</span> Backers
            </h1>
            
            <p className="text-sm sm:text-base font-normal text-slate-500 dark:text-zinc-400 max-w-2xl mt-3 mb-0 leading-relaxed">
              Verified network logs of enterprise organizations and individual entities underwriting production computational runtimes, distributed optimization, and secure deployment pipelines across our open-source ecosystem.
            </p>
          </div>

          <div className="w-full">
            <FintechExecutionConsole />
          </div>

        </div>
      </main>
    </Layout>
  );
};

export default SponsorsPage;
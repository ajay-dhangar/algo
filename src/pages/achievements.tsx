import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Trophy, Users, Rocket, Award, ArrowRight, Terminal } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText?: string;
  category: string;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  badgeText,
  category,
  index,
}) => {
  return (
    <div className="group relative bg-white dark:bg-[#0c0c20]/40 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-blue-500/30 dark:hover:border-[var(--ifm-color-primary)]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Structural System Crosshairs */}
      <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-slate-400 dark:text-zinc-600 pointer-events-none select-none">
        // MTX_0{index + 1}
      </div>
      
      <div className="space-y-5">
        {/* Card Header Matrix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 text-[var(--ifm-color-primary)]">
            {icon}
          </div>
          {badgeText && (
            <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-800 shadow-3xs">
              {badgeText}
            </span>
          )}
        </div>

        {/* Card Informational Elements */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--ifm-color-primary)] uppercase block">
            {category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-50 m-0 tracking-tight">
            {title}
          </h3>
          <p className="text-xs font-normal text-slate-500 dark:text-zinc-400 leading-relaxed m-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function AchievementsPage(): JSX.Element {
  const milestones = [
    {
      title: "GSSoC '26 Official Selection",
      description: "Successfully onboarded as an official mentoring partner repository for GirlScript Summer of Code 2026, opening doors for global collaboration.",
      icon: <Trophy className="w-5 h-5" />,
      badgeText: "Core Milestone",
      category: "Ecosystem Partners",
    },
    {
      title: "Community Scaling Milestone",
      description: "Crossed core benchmarks of active worldwide developers collaborating asynchronously on documentation and codebase enhancements.",
      icon: <Users className="w-5 h-5" />,
      badgeText: "Active Registry",
      category: "Open Source Community",
    },
    {
      title: "Production CI/CD Automation",
      description: "Implemented rigorous, automated GitHub Action pull request testing checks to maintain flawless formatting and build verification.",
      icon: <Rocket className="w-5 h-5" />,
      badgeText: "100% Pass Rate",
      category: "DevOps & Guardrails",
    },
    {
      title: "Interactive Documentation Architecture",
      description: "Successfully structured an advanced documentation matrix pairing raw algorithmic math concepts with clean structural layouts.",
      icon: <Award className="w-5 h-5" />,
      badgeText: "MDX Engine",
      category: "Technical Content",
    },
  ];

  return (
    <Layout
      title="Achievements"
      description="Celebrating the major open-source milestones and engineering achievements of the Algo community."
    >
      <main className="min-h-screen bg-[var(--ifm-background-color)] text-slate-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-300 relative overflow-hidden">
        
        {/* Core Layout Grid System Mask overlay */}
        <div className="absolute top-0 inset-x-0 h-[700px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.06),transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(234,179,8,0.03),transparent_100%)]" />
        <div className="absolute top-0 inset-x-0 h-[700px] pointer-events-none bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-20">
          
          {/* Main Typography Header Panel */}
          <div className="relative max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[var(--ifm-color-primary)]/20 bg-[var(--ifm-color-primary)]/5 text-[10px] font-mono tracking-widest text-[var(--ifm-color-primary)] font-bold uppercase shadow-inner">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--ifm-color-primary)] animate-pulse" />
              ✨ GSSoC '26 PROJECT HUB
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-zinc-50 m-0 leading-[1.1]">
              Repository Achievements.
            </h1>
            
            <p className="text-base sm:text-lg font-normal text-slate-500 dark:text-zinc-400 leading-relaxed max-w-2xl m-0">
              Tracking core development phases, global optimization achievements, and codebase milestones structured by open-source collaborators.
            </p>
          </div>

          {/* Grid Layout Vector Section */}
          <section className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((milestone, index) => (
                <AchievementCard key={index} index={index} {...milestone} />
              ))}
            </div>
          </section>

          {/* Call to Action Module Block */}
          <section className="pt-8">
            <div className="relative rounded-2xl p-8 md:p-12 bg-white dark:bg-[#0c0c20]/20 border border-slate-200 dark:border-zinc-800/80 shadow-2xs overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Layout Decorative Geometric Marks */}
              <div className="absolute top-0 left-0 text-[9px] font-mono opacity-20 text-slate-400 dark:text-zinc-600 select-none p-2 pointer-events-none">+ L_02</div>
              <div className="absolute bottom-0 right-0 text-[9px] font-mono opacity-20 text-slate-400 dark:text-zinc-600 select-none p-2 pointer-events-none">+ R_02</div>

              <div className="space-y-3 max-w-2xl relative z-10">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-50 m-0 tracking-tight">
                  Want to record your engineering input?
                </h2>
                <p className="text-xs md:text-sm font-normal text-slate-500 dark:text-zinc-400 leading-relaxed m-0">
                  Claim an open issue tracker node, integrate an optimized operational matrix, and systematically advance our public algorithms.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <Link 
                  to="/docs/" 
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-mono text-[11px] font-black uppercase tracking-wider text-white dark:text-zinc-950 bg-[var(--ifm-color-primary)] hover:brightness-110 transition-all shadow-sm group border border-transparent hover:no-underline decoration-none"
                >
                  <span>Contribution Parameters</span> 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[8px] font-mono text-slate-400 dark:text-zinc-500 mt-2.5 uppercase tracking-wider">
                  <Terminal className="w-2.5 h-2.5 text-[var(--ifm-color-primary)]" /> routing to /docs/template shell
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}
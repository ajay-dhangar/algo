import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Network, ShieldAlert, Cpu, Spline } from 'lucide-react';

type UpcomingTrack = {
    title: string;
    Icon: React.ComponentType<{ className?: string }>;
    accent: string;
};

const upcomingTracks: UpcomingTrack[] = [
    { title: 'Advanced Network Flows', Icon: Network, accent: 'from-blue-500 to-sky-400' },
    { title: 'Cryptographic Pipelines', Icon: ShieldAlert, accent: 'from-indigo-500 to-purple-400' },
    { title: 'Greedy Heuristic Matrices', Icon: Cpu, accent: 'from-emerald-500 to-teal-400' },
    { title: 'String Pattern Matching', Icon: Spline, accent: 'from-pink-500 to-rose-400' },
];

export default function AlgoComingSoon() {
    return (
        <Layout
            title="Engines Compiling..."
            description="Advanced interactive algorithmic sandboxes are coming soon to the ecosystem playground."
        >
            <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-[var(--ifm-background-color)]">

                {/* Industrial Cyber Grid Backdrop */}
                <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px), 
                                 linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Dynamic Ambient Blur Spotlights */}
                <div className="absolute -top-20 left-1/4 w-72 h-72 bg-[var(--ifm-color-primary)] opacity-10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative w-full max-w-2xl z-10 text-center">

                    {/* Animated Centered Card Platform */}
                    <div className="relative p-8 md:p-12 rounded-3xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-background-surface-color)] shadow-xl overflow-hidden transition-all duration-300 hover:border-[var(--ifm-color-primary-light)]">

                        {/* Top Industrial Ticker */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--ifm-color-primary)] to-transparent opacity-70" />

                        {/* Pulsing Status Terminal Signal */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-mono font-bold tracking-tight bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span>ENGINE_COMPILATION_IN_PROGRESS</span>
                        </div>

                        {/* Core Notification Content */}
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
                            Expanding the <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ifm-color-primary)] via-indigo-500 to-sky-500">
                                Visualization Engines
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-[var(--ifm-color-emphasis-700)] max-w-lg mx-auto leading-relaxed mb-10">
                            We are currently re-architecting our layout playground maps. High-fidelity sandboxes for complex algorithms are being patched directly into the main render path.
                        </p>

                        {/* Micro Pipeline Array Tickers */}
                        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-10 text-left">
                            {upcomingTracks.map((track, idx) => {
                                const TrackIcon = track.Icon;
                                return (
                                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)]">
                                        <div className="p-1.5 rounded-lg bg-slate-500/5 text-[var(--ifm-color-emphasis-800)]">
                                            <TrackIcon className="h-4 w-4 stroke-[1.5]" />
                                        </div>
                                        <span className="text-xs font-medium font-mono truncate text-[var(--ifm-color-emphasis-800)]">
                                            {track.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Clean Functional Action Rows */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[var(--ifm-toc-border-color)] pt-8">
                            <Link
                                to="/algo/visualization"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-transparent bg-[var(--ifm-color-primary)] text-white hover:text-white hover:bg-[var(--ifm-color-primary-dark)] no-underline hover:no-underline shadow-sm"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Return to Active Hub</span>
                            </Link>

                            <div className="flex items-center gap-2 text-xs font-mono text-[var(--ifm-color-emphasis-500)] select-none">
                                <Terminal className="h-3.5 w-3.5" />
                                <span>v2.4-stable</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { 
  FiCopy, FiCheck, FiExternalLink, FiCode, 
  FiTerminal, FiActivity, FiLayers 
} from 'react-icons/fi';
import { ShieldCheck } from "lucide-react";



// Safe slug extractor for paths like /algo/u/{username}/badge or /u/{username}/badge
function extractUsername(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const badgeIndex = segments.lastIndexOf('badge');
  if (badgeIndex > 0) {
    return segments[badgeIndex - 1];
  }
  return segments[segments.length - 2] || 'developer';
}

export default function PublicProfileBadgePage() {
  const location = useLocation();
  const username = useMemo(() => extractUsername(location.pathname), [location.pathname]);
  
  const [copiedFormat, setCopiedFormat] = useState<'markdown' | 'html' | 'url' | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'embed'>('preview');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://codeharborhub.github.io';
  const profileUrl = `${origin}/algo/u/${username}`;
  const shieldBadgeUrl = `https://img.shields.io/badge/Algo%20Profile-${encodeURIComponent(username)}-2563eb?style=for-the-badge&logo=codeforces&logoColor=white`;

  const snippets = {
    markdown: `[![Algo Profile](${shieldBadgeUrl})](${profileUrl})`,
    html: `<a href="${profileUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${shieldBadgeUrl}" alt="${username}'s Algo Profile" />\n</a>`,
    url: profileUrl,
  };

  const handleCopy = async (text: string, format: 'markdown' | 'html' | 'url') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy code snippet:', err);
    }
  };

  return (
    <Layout title={`Badge: ${username}`} description={`Embeddable Algo developer telemetry badge for ${username}`}>
      <main 
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10 md:py-16 font-sans transition-colors duration-300"
        style={{ 
          background: 'var(--ifm-color-emphasis-100)',
          color: 'var(--ifm-font-color-base)'
        }}
      >
        {/* Subtle Engineering Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20 dark:opacity-10" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          {/* Header Description */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--ifm-color-primary)] bg-[var(--ifm-color-primary)]/10 border border-[var(--ifm-color-primary)]/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Telemetry Badge Hub
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight m-0" style={{ color: 'var(--ifm-heading-color)' }}>
              Developer Embed Widget
            </h1>
            <p className="max-w-xl mx-auto text-xs sm:text-sm opacity-75 font-medium leading-relaxed">
              Showcase verified learning streaks, problem counts, and node status for <span className="font-mono text-[var(--ifm-color-primary)] font-bold">@{username}</span> on GitHub READMEs or personal portfolios.
            </p>
          </div>

          {/* Interactive Card Canvas */}
          <div 
            className="rounded-3xl border shadow-xl backdrop-blur-md overflow-hidden transition-all"
            style={{ 
              backgroundColor: 'var(--ifm-card-background-color)', 
              borderColor: 'var(--ifm-color-emphasis-200)' 
            }}
          >
            {/* Control Bar */}
            <div className="flex items-center justify-between border-b px-6 py-4 border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-color-emphasis-100)]/50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono opacity-50 hidden sm:inline-block">algo://badge/{username}</span>
              </div>

              <div className="flex items-center gap-1 bg-[var(--ifm-color-emphasis-200)] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all ${
                    activeTab === 'preview' 
                      ? 'bg-[var(--ifm-card-background-color)] shadow-sm text-[var(--ifm-color-primary)]' 
                      : 'opacity-60 bg-transparent'
                  }`}
                >
                  Live Badges
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('embed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all ${
                    activeTab === 'embed' 
                      ? 'bg-[var(--ifm-card-background-color)] shadow-sm text-[var(--ifm-color-primary)]' 
                      : 'opacity-60 bg-transparent'
                  }`}
                >
                  Integration Snippets
                </button>
              </div>
            </div>

            {/* Canvas Body */}
            <div className="p-6 sm:p-10">
              {activeTab === 'preview' ? (
                <div className="space-y-8">
                  {/* Badge Preset 1: Shields.io Dynamic */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                        <FiLayers className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> GitHub Readme Banner (Shields Spec)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">Auto-Sync</span>
                    </div>
                    <div className="p-6 rounded-2xl border border-dashed border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)]/40 flex items-center justify-center">
                      <Link to={profileUrl} target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform">
                        <img src={shieldBadgeUrl} alt={`${username} Algo Profile Badge`} className="shadow-md rounded" />
                      </Link>
                    </div>
                  </div>

                  {/* Badge Preset 2: Minimal Interactive Capsule */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                      <FiActivity className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> Modern Interactive Capsule
                    </span>
                    <div className="p-6 rounded-2xl border border-dashed border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)]/40 flex items-center justify-center">
                      <Link
                        to={profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-300)] shadow-md hover:border-[var(--ifm-color-primary)] transition-all group no-underline"
                      >
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold uppercase tracking-wider opacity-60">Algo Node</span>
                          <span className="h-3 w-px bg-[var(--ifm-color-emphasis-300)]" />
                          <span className="text-sm font-black text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)] transition-colors">
                            @{username}
                          </span>
                        </div>
                        <FiExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity text-[var(--ifm-color-primary)]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* Embed Code View */
                <div className="space-y-6">
                  {/* Markdown Snippet */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                        <FiCode className="text-blue-500" /> Markdown (GitHub / GitLab)
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(snippets.markdown, 'markdown')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[var(--ifm-color-primary)] text-white border-0 cursor-pointer hover:opacity-90 transition-all"
                      >
                        {copiedFormat === 'markdown' ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
                        {copiedFormat === 'markdown' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-white/10 m-0 no-scrollbar">
                      <code>{snippets.markdown}</code>
                    </pre>
                  </div>

                  {/* HTML Snippet */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                        <FiTerminal className="text-emerald-500" /> HTML Embed
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(snippets.html, 'html')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[var(--ifm-color-primary)] text-white border-0 cursor-pointer hover:opacity-90 transition-all"
                      >
                        {copiedFormat === 'html' ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
                        {copiedFormat === 'html' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-white/10 m-0 no-scrollbar">
                      <code>{snippets.html}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="border-t px-6 py-4 border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-color-emphasis-100)]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs opacity-70 m-0 font-medium">
                Telemetry endpoints update in real-time as solutions are committed.
              </p>

              <Link
                to={profileUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--ifm-color-primary)] text-white no-underline hover:no-underline hover:opacity-90 transition-all shadow-sm active:scale-95"
              >
                View Live Node Profile <FiExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}
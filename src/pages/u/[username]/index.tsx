import React, { useMemo, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUserCheck, FiShieldOff, FiCopy, FiCheck, 
  FiAward, FiActivity, FiCode, FiTerminal, FiExternalLink, FiShare2
} from 'react-icons/fi';
import { buildPublicProfileSnapshot } from '../../../utils/publicProfile';

function getUsernameFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

export default function PublicProfilePage() {
  const location = useLocation();
  const username = useMemo(() => getUsernameFromPathname(location.pathname), [location.pathname]);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('https://ajay-dhangar.github.io');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const snapshot = useMemo(() => buildPublicProfileSnapshot({
    username,
    displayName: username.replace(/-/g, ' ') || 'Developer',
  }), [username]);

  const badgeMarkdown = useMemo(() => {
    const badgeUrl = `${origin}/algo/u/${username}/badge`;
    return `[![Algo profile](https://img.shields.io/badge/Algo%20profile-${encodeURIComponent(username)}-2563eb?style=for-the-badge&logo=codeforces&logoColor=white)](${badgeUrl})`;
  }, [username, origin]);

  const handleCopyBadge = async () => {
    try {
      await navigator.clipboard.writeText(badgeMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy badge text:', err);
    }
  };

  const title = snapshot.isPublic ? `${snapshot.displayName}'s Profile` : 'Private Profile';

  if (!snapshot.isPublic) {
    return (
      <Layout title="Private Profile" description="This profile is restricted or private.">
        <main 
          className="min-h-[calc(100vh-3.7rem)] flex items-center justify-center px-4 py-16 font-sans"
          style={{ background: 'var(--ifm-color-emphasis-100)' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md rounded-3xl border p-8 sm:p-10 text-center shadow-xl backdrop-blur-md"
            style={{ 
              backgroundColor: 'var(--ifm-card-background-color)', 
              borderColor: 'var(--ifm-color-emphasis-200)' 
            }}
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 mb-6 shadow-inner">
              <FiShieldOff className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight m-0" style={{ color: 'var(--ifm-heading-color)' }}>
              Restricted Telemetry Node
            </h1>
            <p className="mt-3 text-xs sm:text-sm opacity-75 leading-relaxed font-medium">
              The owner has disabled public telemetry data and metrics sharing for this workspace profile.
            </p>
            <Link 
              className="mt-6 inline-flex items-center gap-2 justify-center w-full rounded-xl bg-[var(--ifm-color-primary)] px-5 py-3 text-xs font-bold text-white no-underline hover:no-underline hover:opacity-90 transition-all shadow-md active:scale-95" 
              to="/algo/profile"
            >
              Configure Node Settings
            </Link>
          </motion.div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={title} description={`Public Algo study profile for ${snapshot.displayName}`}>
      <main 
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans transition-colors duration-300"
        style={{ 
          background: 'var(--ifm-color-emphasis-100)',
          color: 'var(--ifm-font-color-base)'
        }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-25 dark:opacity-10" />

        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10">
          
          {/* Identity Header Card */}
          <motion.section 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--ifm-card-background-color)', 
              borderColor: 'var(--ifm-color-emphasis-200)' 
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-white bg-gradient-to-tr from-[var(--ifm-color-primary-dark)] to-[var(--ifm-color-primary)] shadow-md border-2 border-white/20">
                    {snapshot.displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--ifm-card-background-color)] bg-emerald-500 shadow-sm" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--ifm-color-primary)] bg-[var(--ifm-color-primary)]/10 border border-[var(--ifm-color-primary)]/20 px-2.5 py-0.5 rounded-full">
                      Verified Node
                    </span>
                    <span className="text-xs font-mono font-semibold opacity-60 flex items-center gap-1">
                      <FiTerminal className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> @{snapshot.username}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.displayName}
                  </h1>

                  <p className="m-0 text-xs sm:text-sm opacity-75 max-w-xl leading-relaxed font-medium">
                    {snapshot.bio || 'A dedicated developer actively tracking algorithm mastery, problem-solving streaks, and technical metrics.'}
                  </p>
                </div>
              </div>

              {snapshot.allowBadgeEmbed && (
                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    to={`/algo/u/${username}/badge`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)] opacity-90 hover:opacity-100 transition-all text-[var(--ifm-font-color-base)] no-underline hover:no-underline"
                  >
                    <FiUserCheck className="text-emerald-500 w-4 h-4" /> Embed Badge <FiExternalLink className="w-3 h-3 opacity-60" />
                  </Link>
                </div>
              )}
            </div>
          </motion.section>

          {/* Bento Grid Telemetry Metrics */}
          <motion.section 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {snapshot.visibleSections.includes('solved') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all group"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Solved Nodes</span>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
                    <FiCode className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.solvedCount.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">Completed learning milestones and algorithmic challenges.</p>
                </div>
              </div>
            )}

            {snapshot.visibleSections.includes('quiz-mastery') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all group"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Quiz Mastery</span>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
                    <FiAward className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.masteryCount.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">Evaluated assessments completed with high accuracy.</p>
                </div>
              </div>
            )}

            {snapshot.visibleSections.includes('streak') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all group sm:col-span-2 lg:col-span-1"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Active Streak</span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                    <FiActivity className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.streak} Days
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">
                    {snapshot.lastActiveAt ? 'Telemetry active and verified.' : 'No activity logged today.'}
                  </p>
                </div>
              </div>
            )}
          </motion.section>

          {/* Quick Embed Integration Banner */}
          {snapshot.allowBadgeEmbed && (
            <motion.section 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-3xl border p-6 sm:p-8 space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-base sm:text-lg font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    Quick Markdown Snippet
                  </h2>
                  <p className="text-xs opacity-75 mt-1 m-0 font-medium">
                    Embed this live dynamic badge directly in your GitHub profile README.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBadge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--ifm-color-primary)] text-white border-0 hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="check" className="flex items-center gap-1.5" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <FiCheck className="w-4 h-4" /> Copied!
                      </motion.span>
                    ) : (
                      <motion.span key="copy" className="flex items-center gap-1.5" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <FiCopy className="w-4 h-4" /> Copy Markdown
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="relative">
                <pre className="m-0 p-4 rounded-2xl text-xs font-mono overflow-x-auto border bg-slate-950 text-slate-100 border-white/10 shadow-inner">
                  <code>{badgeMarkdown}</code>
                </pre>
              </div>
            </motion.section>
          )}

        </div>
      </main>
    </Layout>
  );
}
import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { motion } from 'framer-motion';
import { 
  FiUserCheck, FiShieldOff, FiCopy, FiCheck, 
  FiAward, FiActivity, FiCode, FiTerminal 
} from 'react-icons/fi';
import { buildPublicProfileSnapshot } from '../../utils/publicProfile';

// Helper to reliably extract the dynamic username from the URL path
function getUsernameFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  // Returns 'dev' from '/u/dev' or '/algo/u/dev'
  return segments[segments.length - 1] || '';
}

export default function PublicProfilePage() {
  const location = useLocation();
  const username = useMemo(() => getUsernameFromPathname(location.pathname), [location.pathname]);
  const [copied, setCopied] = useState(false);

  const snapshot = useMemo(() => buildPublicProfileSnapshot({
    username,
    displayName: username.replace(/-/g, ' ') || 'Developer',
  }), [username]);

  const badgeMarkdown = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
    const badgeUrl = new URL(`/algo/u/${username}/badge`, origin).toString();
    return `[![Algo profile](https://img.shields.io/badge/Algo%20profile-${encodeURIComponent(username)}-blue)](${badgeUrl})`;
  }, [username]);

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
          className="min-h-[calc(100vh-3.7rem)] flex items-center justify-center px-4 py-16"
          style={{ background: 'var(--ifm-color-emphasis-100)' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-3xl border p-8 sm:p-10 text-center shadow-lg backdrop-blur-md"
            style={{ 
              backgroundColor: 'var(--ifm-card-background-color)', 
              borderColor: 'var(--ifm-color-emphasis-200)' 
            }}
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 mb-6">
              <FiShieldOff className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
              Private Workspace Profile
            </h1>
            <p className="mt-3 text-xs sm:text-sm opacity-75 leading-relaxed">
              The owner has disabled public telemetry sharing for this node.
            </p>
            <Link 
              className="mt-6 inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--ifm-color-primary)] px-5 py-2.5 text-xs font-bold text-white no-underline hover:no-underline hover:opacity-90 transition-all shadow-sm active:scale-95" 
              to="/algo/profile"
            >
              Configure Profile Settings
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30 dark:opacity-10" />

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
          
          {/* Identity Header Card */}
          <section 
            className="rounded-3xl border p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all"
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
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--ifm-card-background-color)] bg-emerald-500" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--ifm-color-primary)] bg-[var(--ifm-color-primary)]/10 px-2.5 py-0.5 rounded-full">
                      Verified Node
                    </span>
                    <span className="text-xs font-semibold opacity-60 flex items-center gap-1">
                      <FiTerminal className="w-3.5 h-3.5" /> @{snapshot.username}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.displayName}
                  </h1>

                  <p className="m-0 text-xs sm:text-sm opacity-75 max-w-2xl leading-relaxed font-medium pt-1">
                    {snapshot.bio || 'A growing Algo learner sharing progress, mastery, and streaks with peers and teams.'}
                  </p>
                </div>
              </div>

              {snapshot.allowBadgeEmbed && (
                <div className="shrink-0 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-[var(--ifm-color-emphasis-300)] opacity-80 bg-[var(--ifm-color-emphasis-100)]">
                    <FiUserCheck className="text-emerald-500 w-4 h-4" /> Badge Ready
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Interactive Bento Metrics Section */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snapshot.visibleSections.includes('solved') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Solved Nodes</span>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                    <FiCode className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.solvedCount.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">Completed learning milestones tracked in Algo.</p>
                </div>
              </div>
            )}

            {snapshot.visibleSections.includes('quiz-mastery') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Quiz Mastery</span>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                    <FiAward className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.masteryCount.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">Quizzes evaluated with 90% or higher score.</p>
                </div>
              </div>
            )}

            {snapshot.visibleSections.includes('streak') && (
              <div 
                className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--ifm-color-primary)] transition-all sm:col-span-2 lg:col-span-1"
                style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Active Streak</span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <FiActivity className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    {snapshot.streak} Days
                  </p>
                  <p className="text-xs opacity-70 mt-1 m-0 font-medium">
                    {snapshot.lastActiveAt ? 'Telemetry active recently.' : 'No activity logged yet.'}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Embed Markdown Section */}
          {snapshot.allowBadgeEmbed && (
            <section 
              className="rounded-3xl border p-6 sm:p-8 space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-200)' }}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-black m-0" style={{ color: 'var(--ifm-heading-color)' }}>
                    Embed Badge in Readme
                  </h2>
                  <p className="text-xs opacity-75 mt-1 m-0">
                    Copy and paste the markdown snippet below into your GitHub profile or personal repository.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBadge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--ifm-color-primary)] text-white border-0 hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Markdown'}
                </button>
              </div>

              <div className="relative group">
                <pre className="m-0 p-4 rounded-2xl text-xs font-mono overflow-x-auto border bg-black/90 text-slate-100 border-white/10 no-scrollbar">
                  <code>{badgeMarkdown}</code>
                </pre>
              </div>
            </section>
          )}

        </div>
      </main>
    </Layout>
  );
}
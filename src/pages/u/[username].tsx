import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { buildPublicProfileSnapshot } from '../../utils/publicProfile';

function slugFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

export default function PublicProfilePage() {
  const location = useLocation();
  const username = slugFromPath(location.pathname);

  const snapshot = useMemo(() => buildPublicProfileSnapshot({
    username,
    displayName: username.replace(/-/g, ' '),
  }), [username]);

  const title = snapshot.isPublic ? `${snapshot.displayName}'s profile` : 'Private profile';

  if (!snapshot.isPublic) {
    return (
      <Layout title="Private profile" description="This profile is not public yet.">
        <main className="min-h-screen px-6 py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-3xl font-black">This profile is private</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              The owner has not enabled public sharing for this profile yet.
            </p>
            <Link className="mt-6 inline-flex items-center rounded-lg bg-[var(--ifm-color-primary)] px-4 py-2 text-sm font-semibold text-white" to="/profile">
              Open your profile settings
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={title} description={`Public study profile for ${snapshot.displayName}`}>
      <main className="min-h-screen bg-slate-50 px-6 py-16 dark:bg-[#060816]">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ifm-color-primary)]">Public study profile</p>
                <h1 className="mt-2 text-3xl font-black">{snapshot.displayName}</h1>
                <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                  {snapshot.bio || 'A growing Algo learner sharing progress, mastery, and streaks with friends and recruiters.'}
                </p>
              </div>
              {snapshot.allowBadgeEmbed && (
                <div className="rounded-xl border border-dashed border-slate-300 p-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  Badge ready for your README
                </div>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {snapshot.visibleSections.includes('solved') && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Solved problems</p>
                <p className="mt-3 text-4xl font-black">{snapshot.solvedCount}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Completed learning milestones tracked in Algo.</p>
              </div>
            )}
            {snapshot.visibleSections.includes('quiz-mastery') && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Quiz mastery</p>
                <p className="mt-3 text-4xl font-black">{snapshot.masteryCount}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Quizzes scored 90% or higher.</p>
              </div>
            )}
            {snapshot.visibleSections.includes('streak') && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Current streak</p>
                <p className="mt-3 text-4xl font-black">{snapshot.streak}d</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{snapshot.lastActiveAt ? 'Last active recently.' : 'No activity yet.'}</p>
              </div>
            )}
          </section>

          {snapshot.allowBadgeEmbed && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black">Embed this in your README</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Use the badge below in GitHub or any other profile page.</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
                {getPublicProfileBadgeMarkdown(snapshot.username)}
              </pre>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}

function getPublicProfileBadgeMarkdown(username: string): string {
  return `[![Algo profile](https://img.shields.io/badge/Algo%20profile-${encodeURIComponent(username)}-blue)](${new URL(`/u/${username}/badge`, typeof window !== 'undefined' ? window.location.origin : 'https://example.com').toString()})`;
}

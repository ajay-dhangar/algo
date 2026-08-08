import React from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';

function slugFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 2] || '';
}

export default function PublicProfileBadgePage() {
  const location = useLocation();
  const username = slugFromPath(location.pathname);

  return (
    <Layout title="Profile badge" description="Embeddable profile badge">
      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto flex max-w-2xl justify-center">
          <a
            href={`/u/${username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <span className="mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Algo profile · {username || 'user'}
          </a>
        </div>
      </main>
    </Layout>
  );
}

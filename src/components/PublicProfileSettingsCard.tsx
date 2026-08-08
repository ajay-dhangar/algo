import React, { useEffect, useState } from 'react';
import { getPublicProfileSettings, savePublicProfileSettings } from '../utils/publicProfile';

export default function PublicProfileSettingsCard() {
  const [settings, setSettings] = useState(() => getPublicProfileSettings() || {
    isPublic: false,
    username: '',
    displayName: '',
    bio: '',
    showSolvedProblems: true,
    showQuizMastery: true,
    showStreak: true,
    allowBadgeEmbed: false,
  });

  useEffect(() => {
    const current = getPublicProfileSettings();
    if (current) {
      setSettings(current);
    }
  }, []);

  const save = (next: typeof settings) => {
    setSettings(next);
    savePublicProfileSettings(next);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black">Shareable profile</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Make your learning progress visible to recruiters or study partners with a persistent profile page.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold dark:border-slate-700">
          <input
            type="checkbox"
            checked={settings.isPublic}
            onChange={(event) => save({ ...settings, isPublic: event.target.checked })}
          />
          Public
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold">
          <span className="mb-1 block">Username</span>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={settings.username}
            onChange={(event) => save({ ...settings, username: event.target.value })}
            placeholder="your-handle"
          />
        </label>
        <label className="text-sm font-semibold">
          <span className="mb-1 block">Display name</span>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={settings.displayName}
            onChange={(event) => save({ ...settings, displayName: event.target.value })}
            placeholder="Ada Lovelace"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold">
        <span className="mb-1 block">Short bio</span>
        <textarea
          className="min-h-24 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={settings.bio}
          onChange={(event) => save({ ...settings, bio: event.target.value })}
          placeholder="Tell people what you're learning."
        />
      </label>

      <div className="mt-6 space-y-3 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showSolvedProblems}
            onChange={(event) => save({ ...settings, showSolvedProblems: event.target.checked })}
          />
          Show solved problems
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showQuizMastery}
            onChange={(event) => save({ ...settings, showQuizMastery: event.target.checked })}
          />
          Show quiz mastery badges
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showStreak}
            onChange={(event) => save({ ...settings, showStreak: event.target.checked })}
          />
          Show streak
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.allowBadgeEmbed}
            onChange={(event) => save({ ...settings, allowBadgeEmbed: event.target.checked })}
          />
          Allow badge embed for GitHub README
        </label>
      </div>
    </div>
  );
}

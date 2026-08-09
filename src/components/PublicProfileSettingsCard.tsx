import React, { useEffect, useState } from 'react';
import { getPublicProfileSettings, savePublicProfileSettings, getPublicProfileBadgeMarkdown } from '../utils/publicProfile';

const sectionFields = [
  {
    key: 'showSolvedProblems',
    label: 'Show solved problems',
    description: 'Display your solved problem tally on the public profile page.',
    help: 'This option exposes your solved count so recruiters can quickly see your learning progress.',
  },
  {
    key: 'showQuizMastery',
    label: 'Show quiz mastery badges',
    description: 'Reveal your quiz performance on the public profile page.',
    help: 'When enabled, your quiz mastery section can be shown as part of your public profile.',
  },
  {
    key: 'showStreak',
    label: 'Show streak',
    description: 'Include your current streak in the public profile summary.',
    help: 'This shows how many consecutive days you have been active in Algo.',
  },
  {
    key: 'allowBadgeEmbed',
    label: 'Allow badge embed for GitHub README',
    description: 'Provide an embeddable badge for README files.',
    help: 'This allows other people to copy badge markdown and add your public profile badge to GitHub or docs.',
  },
];

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
  const [copyMessage, setCopyMessage] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const profileUrl = typeof window !== 'undefined' && settings.username.trim()
    ? `${window.location.origin}/u/${settings.username.trim()}`
    : '';

  const badgeMarkdown = settings.username.trim()
    ? getPublicProfileBadgeMarkdown(settings.username.trim())
    : '';

  const copyToClipboard = async (text: string, label: string) => {
    if (!text) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopyMessage(`${label} copied!`);
      window.setTimeout(() => setCopyMessage(''), 2500);
    } catch (error) {
      setCopyMessage(`Unable to copy ${label}`);
      window.setTimeout(() => setCopyMessage(''), 2500);
    }
  };

  const shareProfile = async () => {
    if (!profileUrl) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: `${settings.displayName}'s Algo profile`, url: profileUrl });
        return;
      } catch (err) {
        // fallback to copy on cancel or unsupported share flow
      }
    }

    await copyToClipboard(profileUrl, 'Profile URL');
  };

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

      {settings.username && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
          <p className="font-semibold">Your public page</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="truncate text-xs text-slate-500 dark:text-slate-400">{profileUrl}</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={shareProfile}
                className="rounded-full bg-[var(--ifm-color-primary)] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[var(--ifm-color-primary-dark)]"
              >
                Share profile
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(badgeMarkdown, 'Badge markdown')}
                className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Copy README badge
              </button>
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Open page
              </a>
            </div>
          </div>
        </div>
      )}

      {copyMessage && (
        <div className="mt-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
          {copyMessage}
        </div>
      )}

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
        {sectionFields.map((section) => {
          const isActive = expandedSection === section.key;
          const checked = settings[section.key as keyof typeof settings] as boolean;

          return (
            <div
              key={section.key}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-colors duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950"
            >
              <button
                type="button"
                onClick={() => setExpandedSection(isActive ? null : section.key)}
                className="flex w-full items-center justify-between gap-3 text-left"
                aria-expanded={isActive}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => save({ ...settings, [section.key]: event.target.checked })}
                    onClick={(event) => event.stopPropagation()}
                    className="h-4 w-4 rounded border-slate-300 text-[var(--ifm-color-primary)] focus:ring-[var(--ifm-color-primary)]"
                  />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{section.label}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isActive ? 'Hide details' : 'Show details'}
                </span>
              </button>

              {isActive && (
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{section.description}</p>
                  <p className="mt-2 text-sm leading-6">{section.help}</p>

                  {section.key === 'allowBadgeEmbed' && settings.username.trim() && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(badgeMarkdown, 'Badge markdown')}
                        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Copy README badge
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(profileUrl, 'Profile URL')}
                        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Copy profile link
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

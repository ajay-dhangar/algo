import { getAchievementSnapshot, readAlgoProgress, safeJsonParse } from './safeStorage';

export interface PublicProfileSettings {
  isPublic: boolean;
  username: string;
  displayName: string;
  bio: string;
  showSolvedProblems: boolean;
  showQuizMastery: boolean;
  showStreak: boolean;
  allowBadgeEmbed: boolean;
}

export interface PublicProfileSnapshot extends PublicProfileSettings {
  visibleSections: string[];
  solvedCount: number;
  masteryCount: number;
  streak: number;
  lastActiveAt: string | null;
  profileUrl: string;
  badgeUrl: string;
}

const SETTINGS_KEY = 'algo.public_profile.settings.v1';

function getCurrentHost(): string {
  if (typeof window === 'undefined') {
    return 'https://example.com';
  }

  const origin = window.location.origin;
  return origin || 'https://example.com';
}

export function getPublicProfileSettings(): PublicProfileSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const settings = safeJsonParse<PublicProfileSettings | null>(SETTINGS_KEY, null);
  if (!settings) {
    return null;
  }

  return {
    isPublic: Boolean(settings.isPublic),
    username: settings.username?.trim() || '',
    displayName: settings.displayName?.trim() || settings.username?.trim() || '',
    bio: settings.bio?.trim() || '',
    showSolvedProblems: Boolean(settings.showSolvedProblems),
    showQuizMastery: Boolean(settings.showQuizMastery),
    showStreak: Boolean(settings.showStreak),
    allowBadgeEmbed: Boolean(settings.allowBadgeEmbed),
  };
}

export function savePublicProfileSettings(settings: Partial<PublicProfileSettings>): void {
  if (typeof window === 'undefined') {
    return;
  }

  const current = getPublicProfileSettings() || {
    isPublic: false,
    username: '',
    displayName: '',
    bio: '',
    showSolvedProblems: true,
    showQuizMastery: true,
    showStreak: true,
    allowBadgeEmbed: false,
  };

  const next = { ...current, ...settings };
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
}

export function buildPublicProfileSnapshot(input: {
  username: string;
  displayName?: string;
  email?: string;
  overrideSettings?: Partial<PublicProfileSettings>;
}): PublicProfileSnapshot {
  const settings = getPublicProfileSettings();
  const fallbackSettings: PublicProfileSettings = {
    isPublic: false,
    username: input.username,
    displayName: input.displayName || input.username,
    bio: '',
    showSolvedProblems: false,
    showQuizMastery: false,
    showStreak: false,
    allowBadgeEmbed: false,
  };

  const resolved = { ...fallbackSettings, ...(settings || {}), ...input.overrideSettings };
  const progress = readAlgoProgress();
  const achievement = getAchievementSnapshot(progress);
  const visibleSections = [
    resolved.showSolvedProblems ? 'solved' : null,
    resolved.showQuizMastery ? 'quiz-mastery' : null,
    resolved.showStreak ? 'streak' : null,
  ].filter(Boolean) as string[];

  return {
    isPublic: Boolean(resolved.isPublic),
    username: resolved.username?.trim() || input.username,
    displayName: resolved.displayName?.trim() || input.displayName || input.username,
    bio: resolved.bio?.trim() || '',
    showSolvedProblems: Boolean(resolved.showSolvedProblems),
    showQuizMastery: Boolean(resolved.showQuizMastery),
    showStreak: Boolean(resolved.showStreak),
    allowBadgeEmbed: Boolean(resolved.allowBadgeEmbed),
    visibleSections,
    solvedCount: achievement.completedCount,
    masteryCount: achievement.quizzesMastered,
    streak: achievement.streak,
    lastActiveAt: achievement.lastActiveAt,
    profileUrl: `${getCurrentHost()}/u/${resolved.username?.trim() || input.username}`,
    badgeUrl: `${getCurrentHost()}/u/${resolved.username?.trim() || input.username}/badge`,
  };
}

export function getPublicProfileBadgeMarkdown(username: string): string {
  const slug = username.trim() || 'algo';
  const host = getCurrentHost();
  return `[![Algo profile](https://img.shields.io/badge/Algo%20profile-${encodeURIComponent(slug)}-blue)](${host}/u/${slug}/badge)`;
}

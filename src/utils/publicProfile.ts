import {
  getAchievementSnapshot,
  readAlgoProgress,
  safeJsonParse,
} from "./safeStorage";

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

const SETTINGS_KEY = "algo.public_profile.settings.v1";

/** Returns the current host origin for constructing profile URLs. */
const getCurrentHost = (): string => {
  if (typeof window === "undefined") {
    return "https://example.com";
  }
  const origin = window.location.origin;
  return origin || "https://example.com";
};

/** Returns the stored public profile settings from localStorage, or null if none exist. */
const getPublicProfileSettings = (): PublicProfileSettings | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const settings = safeJsonParse<PublicProfileSettings | null>(SETTINGS_KEY, null);
  if (!settings) {
    return null;
  }
  return {
    isPublic: settings.isPublic !== undefined ? Boolean(settings.isPublic) : true,
    username: settings.username?.trim() || "",
    displayName: settings.displayName?.trim() || settings.username?.trim() || "",
    bio: settings.bio?.trim() || "",
    showSolvedProblems:
      settings.showSolvedProblems !== undefined ? Boolean(settings.showSolvedProblems) : true,
    showQuizMastery:
      settings.showQuizMastery !== undefined ? Boolean(settings.showQuizMastery) : true,
    showStreak: settings.showStreak !== undefined ? Boolean(settings.showStreak) : true,
    allowBadgeEmbed:
      settings.allowBadgeEmbed !== undefined ? Boolean(settings.allowBadgeEmbed) : true,
  };
};

/** Merges partial settings with the current stored settings and persists to localStorage. */
const savePublicProfileSettings = (settings: Partial<PublicProfileSettings>): void => {
  if (typeof window === "undefined") {
    return;
  }
  const current = getPublicProfileSettings() || {
    isPublic: true,
    username: "",
    displayName: "",
    bio: "",
    showSolvedProblems: true,
    showQuizMastery: true,
    showStreak: true,
    allowBadgeEmbed: true,
  };
  const next = { ...current, ...settings };
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
};

/**
 * Builds a complete public profile snapshot from localStorage data.
 * Returns isPublic: false when no stored settings match the URL slug,
 * preventing unknown usernames from exposing a default-public profile.
 */
const buildPublicProfileSnapshot = (input: {
  username: string;
  displayName?: string;
  email?: string;
  overrideSettings?: Partial<PublicProfileSettings>;
}): PublicProfileSnapshot => {
  const cleanUsername = input.username?.trim() || "developer";
  const cleanDisplayName =
    input.displayName?.trim() || cleanUsername.replace(/-/g, " ");

  const settings = getPublicProfileSettings();

  // isPublic defaults to false — a profile is only public when the stored
  // username matches the URL slug AND the user has explicitly set isPublic: true.
  const fallbackSettings: PublicProfileSettings = {
    isPublic: false,
    username: cleanUsername,
    displayName: cleanDisplayName,
    bio:
      "I'm a passionate developer and problem solver, sharing my journey on Algo! Join me as I tackle coding challenges, explore algorithms, and level up my skills. Let's code, learn, and grow together!",
    showSolvedProblems: true,
    showQuizMastery: true,
    showStreak: true,
    allowBadgeEmbed: true,
  };

  const matchesStoredSettings =
    settings?.username?.trim()?.toLowerCase() === cleanUsername.toLowerCase();

  const settingsToUse = matchesStoredSettings ? settings : null;

  const resolved = {
    ...fallbackSettings,
    ...(settingsToUse || {}),
    ...input.overrideSettings,
  };

  const progress = readAlgoProgress();
  const achievement = getAchievementSnapshot(progress);

  const visibleSections = [
    resolved.showSolvedProblems ? "solved" : null,
    resolved.showQuizMastery ? "quiz-mastery" : null,
    resolved.showStreak ? "streak" : null,
  ].filter(Boolean) as string[];

  const targetSlug = resolved.username?.trim() || cleanUsername;

  return {
    isPublic: Boolean(resolved.isPublic),
    username: targetSlug,
    displayName: resolved.displayName?.trim() || cleanDisplayName,
    bio: resolved.bio?.trim() || "",
    showSolvedProblems: Boolean(resolved.showSolvedProblems),
    showQuizMastery: Boolean(resolved.showQuizMastery),
    showStreak: Boolean(resolved.showStreak),
    allowBadgeEmbed: Boolean(resolved.allowBadgeEmbed),
    visibleSections,
    solvedCount: achievement?.completedCount || 0,
    masteryCount: achievement?.quizzesMastered || 0,
    streak: achievement?.streak || 0,
    lastActiveAt: achievement?.lastActiveAt || null,
    profileUrl: `${getCurrentHost()}/u/${targetSlug}`,
    badgeUrl: `${getCurrentHost()}/u/${targetSlug}/badge`,
  };
};

/** Returns a Shields.io badge markdown string for the given Algo username. */
const getPublicProfileBadgeMarkdown = (username: string): string => {
  const slug = username.trim() || "algo";
  const host = getCurrentHost();
  return `[![Algo profile](https://img.shields.io/badge/Algo%20profile-${encodeURIComponent(
    slug,
  )}-blue)](${host}/u/${slug}/badge)`;
};

export {
  getPublicProfileSettings,
  savePublicProfileSettings,
  buildPublicProfileSnapshot,
  getPublicProfileBadgeMarkdown,
};

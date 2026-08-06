/**
 * Contributor Achievement / XP System
 * ------------------------------------------------
 * Pure logic for turning a contributor's merged-PR history into a set of
 * earned badges, plus a shields.io badge generator so contributors can
 * show off a badge on their own GitHub profile README.
 *
 * PRs are categorized by keyword-matching their title (the same
 * lightweight heuristic already used elsewhere in this repo — see
 * `parseLocalProgress` in src/pages/leaderboard/index.tsx — since we
 * don't have per-PR file-diff data available without much more expensive
 * API calls).
 */

export type PRCategory = "algorithm" | "docs" | "bugfix" | "feature" | "other";

export interface MergedPR {
  title: string;
  mergedAt: string; // ISO date
}

export interface ContributorPRStats {
  login: string;
  mergedPRCount: number;
  prs: MergedPR[];
}

export interface EarnedBadge {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** Higher = more prestigious, used to pick the "top" badge for a README snippet */
  weight: number;
  color: string; // shields.io color name/hex (without '#')
}

/** Keyword heuristics — order matters, first match wins per PR */
export function categorizePRTitle(title: string): PRCategory {
  const t = title.toLowerCase();

  const isFix = /\bfix(es|ed)?\b|\bresolve[sd]?\b/.test(t);
  const isDocsWord = /\bdocs?\b|\btypo\b|\breadme\b|\bdocumentation\b/.test(t);
  const isBugWord = /\bbug\b|\berror\b|\bcrash\b|\bissue\b|\bbroken\b/.test(t);
  const isAlgoWord =
    /\balgorithm[s]?\b|\bdata[- ]structure[s]?\b|\bimplement(ed|ation)?\b|\badd(ed)?\s+(a\s+)?(new\s+)?(algorithm|sort|search|tree|graph|queue|stack|heap)\b/.test(
      t
    );
  const isFeatureWord = /\bfeat(ure)?\b|\badd(ed|s)?\b|\bnew\b|\bimplement/.test(t);

  if (isFix && isDocsWord) return "docs";
  if (isFix && isBugWord) return "bugfix";
  if (isAlgoWord) return "algorithm";
  if (isDocsWord) return "docs";
  if (isFeatureWord) return "feature";
  return "other";
}

interface TierDef {
  min: number;
  id: string;
  label: string;
  emoji: string;
  weight: number;
  color: string;
}

function pickTier(count: number, tiers: TierDef[]): TierDef | null {
  // tiers must be sorted ascending by `min`; pick the highest tier reached
  let matched: TierDef | null = null;
  for (const tier of tiers) {
    if (count >= tier.min) matched = tier;
  }
  return matched;
}

const ALGORITHM_TIERS: TierDef[] = [
  { min: 1, id: "algo-1", label: "Algorithm Rookie", emoji: "🌱", weight: 10, color: "brightgreen" },
  { min: 5, id: "algo-5", label: "Algorithm Adder", emoji: "🌿", weight: 20, color: "green" },
  { min: 10, id: "algo-10", label: "Algorithm Architect", emoji: "🌳", weight: 30, color: "blue" },
  { min: 25, id: "algo-25", label: "Algorithm Legend", emoji: "🏛️", weight: 40, color: "blueviolet" },
];

const DOCS_TIERS: TierDef[] = [
  { min: 1, id: "docs-1", label: "Docs Tidier", emoji: "🧹", weight: 8, color: "lightgrey" },
  { min: 5, id: "docs-5", label: "Docs Fixer", emoji: "📝", weight: 16, color: "yellow" },
  { min: 10, id: "docs-10", label: "Docs Guardian", emoji: "📚", weight: 24, color: "orange" },
  { min: 25, id: "docs-25", label: "Docs Sage", emoji: "🦉", weight: 32, color: "red" },
];

const BUGFIX_TIERS: TierDef[] = [
  { min: 1, id: "bug-1", label: "Bug Spotter", emoji: "🔍", weight: 9, color: "yellowgreen" },
  { min: 5, id: "bug-5", label: "Bug Squasher", emoji: "🪲", weight: 18, color: "orange" },
  { min: 15, id: "bug-15", label: "Bug Exterminator", emoji: "🎯", weight: 28, color: "critical" },
];

const FEATURE_TIERS: TierDef[] = [
  { min: 1, id: "feat-1", label: "Feature Starter", emoji: "✨", weight: 8, color: "blue" },
  { min: 5, id: "feat-5", label: "Feature Builder", emoji: "🛠️", weight: 18, color: "informational" },
  { min: 15, id: "feat-15", label: "Feature Architect", emoji: "🏗️", weight: 28, color: "blueviolet" },
];

const OVERALL_TIERS: TierDef[] = [
  { min: 1, id: "overall-1", label: "First-Time Contributor", emoji: "🎉", weight: 5, color: "success" },
  { min: 5, id: "overall-5", label: "Regular Contributor", emoji: "⭐", weight: 15, color: "green" },
  { min: 10, id: "overall-10", label: "Core Contributor", emoji: "💎", weight: 25, color: "blue" },
  { min: 25, id: "overall-25", label: "Elite Contributor", emoji: "🚀", weight: 35, color: "blueviolet" },
  { min: 50, id: "overall-50", label: "Legendary Contributor", emoji: "👑", weight: 50, color: "gold" },
];

function tierToBadge(tier: TierDef, descriptionSuffix: string): EarnedBadge {
  return {
    id: tier.id,
    label: tier.label,
    emoji: tier.emoji,
    description: `${tier.min}+ ${descriptionSuffix}`,
    weight: tier.weight,
    color: tier.color,
  };
}

/**
 * Turns a contributor's merged PR titles into the set of badges they've
 * earned. Only the highest tier reached per category is returned (e.g. a
 * contributor with 12 algorithm PRs gets "Algorithm Architect", not also
 * "Algorithm Rookie" and "Algorithm Adder").
 */
export function computeAchievements(prs: MergedPR[]): EarnedBadge[] {
  const counts: Record<PRCategory, number> = {
    algorithm: 0,
    docs: 0,
    bugfix: 0,
    feature: 0,
    other: 0,
  };

  for (const pr of prs) {
    counts[categorizePRTitle(pr.title)]++;
  }

  const badges: EarnedBadge[] = [];

  const overallTier = pickTier(prs.length, OVERALL_TIERS);
  if (overallTier) badges.push(tierToBadge(overallTier, "merged PRs"));

  const algoTier = pickTier(counts.algorithm, ALGORITHM_TIERS);
  if (algoTier) badges.push(tierToBadge(algoTier, "algorithms added"));

  const docsTier = pickTier(counts.docs, DOCS_TIERS);
  if (docsTier) badges.push(tierToBadge(docsTier, "docs fixed"));

  const bugTier = pickTier(counts.bugfix, BUGFIX_TIERS);
  if (bugTier) badges.push(tierToBadge(bugTier, "bugs fixed"));

  const featureTier = pickTier(counts.feature, FEATURE_TIERS);
  if (featureTier) badges.push(tierToBadge(featureTier, "features shipped"));

  // Sort most prestigious first
  return badges.sort((a, b) => b.weight - a.weight);
}

/** Picks the single most prestigious badge, used for the README snippet */
export function topBadge(badges: EarnedBadge[]): EarnedBadge | null {
  if (badges.length === 0) return null;
  return badges.reduce((best, b) => (b.weight > best.weight ? b : best), badges[0]);
}

/**
 * Builds a shields.io badge URL. shields.io renders the image on the fly
 * from the URL itself, so there's no hosting/backend needed — the
 * contributor just copies the markdown into their README.
 */
export function buildShieldsBadgeUrl(label: string, message: string, color: string): string {
  const encode = (s: string) => encodeURIComponent(s.replace(/-/g, "--").replace(/_/g, "__"));
  return `https://img.shields.io/badge/${encode(label)}-${encode(message)}-${color}?style=for-the-badge&logo=github`;
}

export function buildReadmeMarkdown(username: string, badge: EarnedBadge, mergedPRCount: number): string {
  const imgUrl = buildShieldsBadgeUrl("Algo", `${badge.label} (${mergedPRCount} PRs)`, badge.color);
  const linkUrl = `https://github.com/ajay-dhangar/algo/commits?author=${encodeURIComponent(username)}`;
  return `[![Algo Contributor Badge](${imgUrl})](${linkUrl})`;
}

export const PR_ACHIEVEMENTS_CACHE_KEY = "algo_pr_achievements_v1";
export const PR_ACHIEVEMENTS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

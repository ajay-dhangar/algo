import { useEffect, useState } from "react";
import axios from "axios";
import {
  ContributorPRStats,
  MergedPR,
  PR_ACHIEVEMENTS_CACHE_KEY,
  PR_ACHIEVEMENTS_CACHE_TTL_MS,
} from "./prAchievements";

const REPO = "ajay-dhangar/algo";
const PER_PAGE = 100;
/**
 * How many pages of merged PRs to pull. GitHub's unauthenticated Search API
 * caps results at 1000 and rate-limits at 10 req/min, so we keep this
 * conservative — 5 pages (500 most recent merged PRs) is plenty to compute
 * meaningful badges without risking a rate-limit failure on every page load.
 */
const MAX_PAGES = 5;

interface CachedPayload {
  fetchedAt: number;
  statsByLogin: Record<string, ContributorPRStats>;
}

function loadCache(): CachedPayload | null {
  try {
    const raw = localStorage.getItem(PR_ACHIEVEMENTS_CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedPayload = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > PR_ACHIEVEMENTS_CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveCache(statsByLogin: Record<string, ContributorPRStats>) {
  try {
    const payload: CachedPayload = { fetchedAt: Date.now(), statsByLogin };
    localStorage.setItem(PR_ACHIEVEMENTS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — non-fatal
  }
}

interface GitHubSearchIssueItem {
  title: string;
  closed_at: string | null;
  pull_request?: { merged_at: string | null };
  user: { login: string } | null;
}

async function fetchMergedPRPage(page: number): Promise<GitHubSearchIssueItem[]> {
  const res = await axios.get("https://api.github.com/search/issues", {
    params: {
      q: `repo:${REPO} type:pr is:merged`,
      per_page: PER_PAGE,
      page,
      sort: "created",
      order: "desc",
    },
    headers: { Accept: "application/vnd.github+json" },
  });
  return res.data?.items ?? [];
}

async function fetchAllMergedPRs(): Promise<Record<string, ContributorPRStats>> {
  const statsByLogin: Record<string, ContributorPRStats> = {};

  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchMergedPRPage(page);
    if (items.length === 0) break;

    for (const item of items) {
      const login = item.user?.login;
      if (!login) continue;
      const mergedAt = item.pull_request?.merged_at ?? item.closed_at ?? "";
      const pr: MergedPR = { title: item.title, mergedAt: mergedAt ?? "" };

      if (!statsByLogin[login]) {
        statsByLogin[login] = { login, mergedPRCount: 0, prs: [] };
      }
      statsByLogin[login].mergedPRCount++;
      statsByLogin[login].prs.push(pr);
    }

    if (items.length < PER_PAGE) break; // last page reached
  }

  return statsByLogin;
}

export type PRStatsDataSource = "live" | "cache" | "unavailable";

interface UseMergedPRStatsResult {
  statsByLogin: Record<string, ContributorPRStats>;
  loading: boolean;
  dataSource: PRStatsDataSource;
}

/**
 * Fetches merged-PR history for the repo once, aggregates it per author,
 * and caches the result in localStorage for an hour. If the GitHub Search
 * API is unavailable or rate-limited, this fails silently (returns an
 * empty map) so the rest of the contributors page keeps working — badges
 * are additive, not a hard dependency.
 */
export function useMergedPRStats(): UseMergedPRStatsResult {
  const [statsByLogin, setStatsByLogin] = useState<Record<string, ContributorPRStats>>({});
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<PRStatsDataSource>("unavailable");

  useEffect(() => {
    let isMounted = true;

    async function run() {
      const cached = loadCache();
      if (cached) {
        if (isMounted) {
          setStatsByLogin(cached.statsByLogin);
          setDataSource("cache");
          setLoading(false);
        }
        return;
      }

      try {
        const fresh = await fetchAllMergedPRs();
        if (isMounted) {
          setStatsByLogin(fresh);
          setDataSource("live");
        }
        saveCache(fresh);
      } catch {
        if (isMounted) setDataSource("unavailable");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    run();
    return () => {
      isMounted = false;
    };
  }, []);

  return { statsByLogin, loading, dataSource };
}

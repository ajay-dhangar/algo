export interface AlgoProgressData {
  [key: string]: unknown;
}

import { supabase } from './supabaseClient';

export function getUserId(): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const sessionRaw = window.localStorage.getItem("algo.auth.session.v1");
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session && session.accountId) return session.accountId;
    }
  } catch {}
  return window.localStorage.getItem("quiz_userId") || null;
}

export async function syncAlgoProgress(): Promise<void> {
  const userId = getUserId();
  if (!userId) return;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error("[Algo] Failed to sync progress from Supabase:", error);
      }
      return;
    }

    if (data && data.progress_data) {
      const current = readAlgoProgress();
      const merged = { ...current, ...data.progress_data };
      window.localStorage.setItem('algo_progress', JSON.stringify(merged));
      window.dispatchEvent(new Event('progressUpdated'));
    }
  } catch (err) {
    console.error("[Algo] Error syncing progress from Supabase:", err);
  }
}

export interface AchievementSnapshot {
  completedCount: number;
  completedTopics: string[];
  completedTitles: string[];
  streak: number;
  lastActiveAt: string | null;
}

export function safeJsonParse<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    console.warn("[Algo] Corrupt localStorage key " + key + " — resetting to default.");
    try {
      localStorage.removeItem(key);
    } catch {}
    return fallback;
  }
}

export function readAlgoProgress(): AlgoProgressData {
  return safeJsonParse<AlgoProgressData>('algo_progress', {});
}

export function writeAlgoProgress(progress: AlgoProgressData): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem('algo_progress', JSON.stringify(progress));

  const userId = getUserId();
  if (userId) {
    supabase.from('user_progress').upsert(
      { user_id: userId, progress_data: progress, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    ).then(({ error }) => {
      if (error) {
        console.error("[Algo] Failed to save progress to Supabase:", error);
      }
    });
  }
}

function computeStreak(progress: AlgoProgressData): number {
  if (typeof progress.streak === 'number' && Number.isFinite(progress.streak)) {
    return Math.max(0, progress.streak);
  }

  const activityDates = Object.entries(progress)
    .filter(([key, value]) => key.endsWith('_updatedAt') && typeof value === 'string')
    .map(([, value]) => new Date(String(value)))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())
    .map((date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      return normalized;
    });

  if (activityDates.length === 0) {
    const lastActiveAt = typeof progress.lastActiveAt === 'string' ? progress.lastActiveAt : null;
    if (!lastActiveAt) {
      return 0;
    }

    const parsed = new Date(lastActiveAt);
    return Number.isNaN(parsed.getTime()) ? 0 : 1;
  }

  let streak = 1;
  for (let index = 1; index < activityDates.length; index += 1) {
    const current = activityDates[index];
    const previous = activityDates[index - 1];
    const dayDiff = Math.round((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getAchievementSnapshot(progress: AlgoProgressData = readAlgoProgress()): AchievementSnapshot {
  const completedTopics = Object.entries(progress)
    .filter(([key, value]) => typeof value === 'boolean' && value === true && !key.endsWith('_title') && !key.endsWith('_updatedAt'))
    .map(([key]) => key);

  const completedTitles = Object.entries(progress)
    .filter(([key, value]) => key.endsWith('_title') && typeof value === 'string' && value.trim().length > 0)
    .map(([, value]) => String(value).trim());

  const streak = computeStreak(progress);
  const lastActiveAt = typeof progress.lastActiveAt === 'string' ? progress.lastActiveAt : null;

  return {
    completedCount: completedTopics.length,
    completedTopics,
    completedTitles,
    streak,
    lastActiveAt,
  };
}

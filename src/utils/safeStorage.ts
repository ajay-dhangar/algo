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
  /** Number of quizzes where best score >= 70% */
  quizzesPassed: number;
  /** Number of quizzes where best score >= 90% */
  quizzesMastered: number;
  /** Total quiz IDs found in localStorage */
  totalQuizzesAttempted: number;
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
  window.dispatchEvent(new Event('progressUpdated'));

  const userId = getUserId();
  if (userId) {
    supabase.from('user_progress').upsert(
      { user_id: userId, progress_data: progress, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    ).then(({ error }) => {
    .catch(err=>console.error(err))
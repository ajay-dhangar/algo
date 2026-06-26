// src/utils/safeStorage.ts
export function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[Algo] Corrupt localStorage key "${key}" — resetting to default.`);
    localStorage.removeItem(key);
    return fallback;
  }
}

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

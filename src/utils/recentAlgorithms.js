const STORAGE_KEY = "recentAlgorithms";
const MAX_ITEMS = 10;

export function getRecentAlgorithms() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function addRecentAlgorithm(algorithm) {
  if (typeof window === "undefined") return;

  const recent = getRecentAlgorithms();

  const filtered = recent.filter(
    (item) => item.path !== algorithm.path
  );

  filtered.unshift(algorithm);

  if (filtered.length > MAX_ITEMS) {
    filtered.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearRecentAlgorithms() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

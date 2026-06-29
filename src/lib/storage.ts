import type { AppProgress, DailyStats, Subject } from "./types";

export const storageKeys = {
  subjects: "edutrack_subjects",
  progress: "edutrack_progress",
  daily: "edutrack_daily",
  recent: "edutrack_recent",
} as const;

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  return safeParse(raw, fallback);
}

export function setJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write errors in this helper.
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

export function getSubjects(): Subject[] {
  return getJSON<Subject[]>(storageKeys.subjects, []);
}

export function saveSubjects(subjects: Subject[]): void {
  setJSON(storageKeys.subjects, subjects);
}

export function getProgress(): AppProgress {
  return getJSON<AppProgress>(storageKeys.progress, {});
}

export function saveProgress(progress: AppProgress): void {
  setJSON(storageKeys.progress, progress);
}

export function getDailyStats(): DailyStats {
  const today = new Date().toISOString().split("T")[0];
  const daily = getJSON<DailyStats>(storageKeys.daily, {
    date: today,
    done: 0,
  });
  if (daily.date !== today) {
    return { date: today, done: 0 };
  }
  return daily;
}

export function saveDailyStats(stats: DailyStats): void {
  setJSON(storageKeys.daily, stats);
}

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "beacon.linkLog";

function readLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLog(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage full or unavailable — the session still works, it just won't persist
  }
}

// Tracks every short link created in this browser. The backend has no
// "list all" endpoint, so the log lives client-side and each row asks
// the analytics endpoint for its own click count.
export function useLinkLog() {
  const [entries, setEntries] = useState(() => readLog());

  useEffect(() => {
    writeLog(entries);
  }, [entries]);

  const addEntry = useCallback((entry) => {
    setEntries((prev) => [
      { ...entry, id: `${entry.shortCode}-${Date.now()}`, createdAt: Date.now() },
      ...prev.filter((e) => e.shortCode !== entry.shortCode),
    ]);
  }, []);

  const clearLog = useCallback(() => setEntries([]), []);

  return { entries, addEntry, clearLog };
}

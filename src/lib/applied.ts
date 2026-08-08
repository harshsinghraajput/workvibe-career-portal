const KEY = "talentmicro_applied_jobs";

export function getAppliedJobs(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markJobAsApplied(jobId: number): void {
  if (typeof window === "undefined") return;
  const current = getAppliedJobs();
  if (!current.includes(jobId)) {
    localStorage.setItem(KEY, JSON.stringify([...current, jobId]));
  }
}

export function isJobApplied(jobId: number): boolean {
  return getAppliedJobs().includes(jobId);
}

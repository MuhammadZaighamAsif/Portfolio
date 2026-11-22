/** Small helpers shared by the Experience / Education / Certificates sections. */

const RANGE = /(\d{1,2})\/(\d{4})\s*[–—-]\s*(?:(\d{1,2})\/(\d{4})|(present|current|now))/i;

/** True when a "MM/YYYY – MM/YYYY" or "MM/YYYY – Present" range has not ended yet. */
export function isOngoing(duration: string, now: Date = new Date()): boolean {
  const match = RANGE.exec(duration);
  if (!match) return false;
  if (match[5]) return true;
  const endMonths = Number(match[4]) * 12 + (Number(match[3]) - 1);
  const nowMonths = now.getFullYear() * 12 + now.getMonth();
  return endMonths >= nowMonths;
}

/** The four-digit year a range starts in, e.g. "08/2026 – Present" -> "2026". */
export function startYear(duration: string): string | null {
  const match = /(\d{4})/.exec(duration);
  return match ? match[1] : null;
}

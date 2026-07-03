import type { VercelRequest, VercelResponse } from "@vercel/node";

const globalForAnalytics = globalThis as unknown as {
  __analyticsEventCounts?: Map<string, number>;
};

const eventCounts =
  globalForAnalytics.__analyticsEventCounts ??
  (globalForAnalytics.__analyticsEventCounts = new Map<string, number>());

export default function handler(_req: VercelRequest, res: VercelResponse): void {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const [event, count] of eventCounts) {
    counts[event] = count;
    total += count;
  }
  res.json({ counts, total });
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const TrackEventBody = z.object({
  event: z.string().min(1),
  page: z.string().optional(),
});

const MAX_TRACKED_EVENTS = 200;

const globalForAnalytics = globalThis as unknown as {
  __analyticsEventCounts?: Map<string, number>;
};

const eventCounts =
  globalForAnalytics.__analyticsEventCounts ??
  (globalForAnalytics.__analyticsEventCounts = new Map<string, number>());

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ success: false });
    return;
  }

  const parsed = TrackEventBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ success: false });
    return;
  }

  const { event, page } = parsed.data;

  if (!eventCounts.has(event) && eventCounts.size >= MAX_TRACKED_EVENTS) {
    console.warn("Analytics event cap reached — dropping new event name", { event });
    res.json({ success: true });
    return;
  }

  eventCounts.set(event, (eventCounts.get(event) ?? 0) + 1);
  console.info("Analytics event tracked", { event, page });

  res.json({ success: true });
}

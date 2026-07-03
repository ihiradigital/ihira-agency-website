import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 60_000;

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recentSubmissions.get(key);
  if (last && now - last < DUPLICATE_WINDOW_MS) {
    return true;
  }
  recentSubmissions.set(key, now);
  if (recentSubmissions.size > 500) {
    for (const [k, ts] of recentSubmissions) {
      if (now - ts > DUPLICATE_WINDOW_MS * 2) recentSubmissions.delete(k);
    }
  }
  return false;
}

async function sendToWebhook(webhookUrl: string, data: object): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
}

const QuoteSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  businessName: z.string().min(1, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  websiteUrl: z.string().optional(),
  industry: z.string().optional(),
  serviceInterestedIn: z.string().optional(),
  serviceNeeded: z.string().optional(),
  projectTimeline: z.string().optional(),
  priorityLevel: z.enum(["Emergency", "High", "Normal"]).optional(),
  businessLocation: z.string().optional(),
  preferredContact: z.enum(["Call", "SMS", "Email"]).optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  pageUrl: z.string().optional(),
  source: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const parsed = QuoteSchema.safeParse(req.body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid request";
    res.status(400).json({ success: false, error: firstError });
    return;
  }

  const {
    honeypot, email, fullName, businessName, phone,
    websiteUrl, industry, serviceInterestedIn,
    serviceNeeded, projectTimeline, priorityLevel, businessLocation,
    preferredContact, budget, message, pageUrl, source,
  } = parsed.data;

  if (honeypot && honeypot.length > 0) {
    res.json({
      success: true,
      message: "🎉 Thanks! Your custom proposal request has been received. We'll personally review your project and get back to you soon.",
    });
    return;
  }

  const dedupeKey = `quote:${email}`;
  if (isDuplicate(dedupeKey)) {
    res.status(429).json({
      success: false,
      error: "Please wait before submitting again.",
    });
    return;
  }

  const payload = {
    full_name: fullName,
    business_name: businessName,
    email,
    phone: phone ?? "",
    website_url: websiteUrl ?? "",
    industry: industry ?? "",
    service_interested_in: serviceInterestedIn ?? "",
    service_needed: serviceNeeded ?? "",
    project_timeline: projectTimeline ?? "",
    priority_level: priorityLevel ?? "",
    business_location: businessLocation ?? "",
    preferred_contact: preferredContact ?? "",
    budget: budget ?? "",
    message: message ?? "",
    page_url: pageUrl ?? "",
    source: source ?? "",
    submitted_at: new Date().toISOString(),
  };

  const webhookUrl =
    process.env.PABBLY_PRIORITY_REQUEST_WEBHOOK_URL ??
    process.env.PABBLY_QUOTE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await sendToWebhook(webhookUrl, payload);
    } catch (err) {
      console.error("Proposal webhook delivery failed", err);
    }
  } else {
    console.info("PABBLY_PRIORITY_REQUEST_WEBHOOK_URL not set — skipping webhook", { email });
  }

  res.json({
    success: true,
    message: "🎉 Thanks! Your custom proposal request has been received. We'll personally review your project and get back to you soon.",
  });
}

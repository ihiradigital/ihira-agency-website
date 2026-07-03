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

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  service: z.string().optional(),
  businessName: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  formType: z.string().optional(),
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

  const parsed = ContactSchema.safeParse(req.body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid request";
    res.status(400).json({ success: false, error: firstError });
    return;
  }

  const { honeypot, email, name, phone, service, businessName, message, formType, pageUrl } = parsed.data;

  if (honeypot && honeypot.length > 0) {
    res.json({
      success: true,
      message: "✅ Thanks! We've received your message and will get back to you shortly.",
    });
    return;
  }

  const dedupeKey = `contact:${email}`;
  if (isDuplicate(dedupeKey)) {
    res.status(429).json({
      success: false,
      error: "Please wait before submitting again.",
    });
    return;
  }

  const payload = {
    name,
    email,
    phone: phone ?? "",
    service: service ?? "",
    business_name: businessName ?? "",
    message,
    form_type: formType ?? "Ask a Question",
    page_url: pageUrl ?? "",
    submitted_at: new Date().toISOString(),
  };

  const webhookUrl = process.env.PABBLY_CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await sendToWebhook(webhookUrl, payload);
    } catch (err) {
      console.error("Contact webhook delivery failed", err);
    }
  } else {
    console.info("PABBLY_CONTACT_WEBHOOK_URL not set — skipping webhook", { email });
  }

  res.json({
    success: true,
    message: "✅ Thanks! We've received your message and will get back to you shortly.",
  });
}

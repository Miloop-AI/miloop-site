// Per-instance request throttle. See CLAUDE.local.md for what it does and
// does not guarantee before relying on it.
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Confirmation email sent back to the visitor once the notification has gone
// out. Kept short. Language matches whatever step 0 of the panel recorded.
const CONFIRMATION_COPY = {
  en: {
    subject: "Thanks for reaching out to Miloop AI",
    body: (name) =>
      `Hi ${name},\n\nThank you for reaching out to Miloop AI. We've received the details you shared and will review them shortly.\n\nYou can expect to hear from us within 1 to 2 business days. Should any details about your project change before then, please reply to this email to let us know.\n\nMiloop AI`,
  },
  "zh-Hans": {
    subject: "感谢您联系 Miloop AI",
    body: (name) =>
      `您好，${name}：\n\n谢谢您联系 Miloop AI。您填的内容我们都收到了，会尽快看一遍。\n\n1 到 2 个工作日内我们会给您回复。这期间项目那边如果有什么变化，直接回这封邮件告诉我们就好。\n\nMiloop AI`,
  },
  "zh-Hant": {
    subject: "感謝您聯繫 Miloop AI",
    body: (name) =>
      `您好，${name}：\n\n謝謝您聯繫 Miloop AI。您填的內容我們都收到了，會盡快看一遍。\n\n1 到 2 個工作天內我們會給您回覆。這期間專案那邊如果有什麼變化，直接回這封信告訴我們就好。\n\nMiloop AI`,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload = req.body || {};

  if (payload.website) {
    console.log("Discarded submission");
    res.status(200).json({ ok: true });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests, please try again later" });
    return;
  }

  const { name, email } = payload;

  if (!name || !email || !isValidEmail(email)) {
    res.status(400).json({ error: "Name and a valid email are required" });
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Miloop AI intake <intake@miloop.ai>",
        to: ["info@miloop.ai"],
        reply_to: email,
        subject: `New lead: ${name}`,
        text: formatSummary(payload),
      }),
    });

    if (!response.ok) {
      console.error("Resend error", await response.text());
      res.status(502).json({ error: "Email service unavailable" });
      return;
    }

    // Best-effort visitor confirmation. The notification above is the part
    // that must not fail. If this second send errors, log it and still report
    // success, rather than surfacing a failure for something that worked.
    // Awaited on purpose, even though failure here should not fail the
    // overall request. In a serverless environment, the function's
    // execution can be frozen shortly after the response is sent, so a
    // fire-and-forget call here risked being cut off mid-request before
    // it actually reached Resend.
    try {
      await sendConfirmationEmail(payload);
    } catch (error) {
      console.error("Confirmation email failed", error);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Lead intake handler failed", error);
    res.status(500).json({ error: "Unexpected server error" });
  }
}

async function sendConfirmationEmail(payload) {
  const copy = CONFIRMATION_COPY[payload.lang] || CONFIRMATION_COPY.en;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Miloop AI <intake@miloop.ai>",
      to: [payload.email],
      subject: copy.subject,
      text: copy.body(payload.name),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend confirmation email failed: ${await response.text()}`);
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function formatSummary(payload) {
  const fields = [
    ["Language", payload.lang],
    ["Problem type", Array.isArray(payload.problemType) ? payload.problemType.join(", ") : payload.problemType],
    ["Problem type (other)", payload.problemTypeOtherActive ? payload.problemTypeOther : null],
    ["Segment", payload.segment],
    ["Segment (other)", payload.segmentOther],
    ["Budget", payload.budget],
    ["Budget (other)", payload.budgetOther],
    ["Timeline", payload.timeline],
    ["Timeline (other)", payload.timelineOther],
    ["Source", payload.source],
    ["Source (other)", payload.sourceOther],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company],
    ["Contact method", payload.contactMethod],
    ["Phone", payload.phone],
    ["Note", payload.note],
  ];

  const lines = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  if (Array.isArray(payload.assistantTranscript) && payload.assistantTranscript.length > 0) {
    lines.push("");
    lines.push("--- Virtual assistant transcript (for review, categories above already reflect the assistant's output) ---");
    payload.assistantTranscript.forEach((message) => {
      const speaker = message.role === "user" ? "Visitor" : "Assistant";
      lines.push(`${speaker}: ${message.content}`);
    });
  }

  return lines.join("\n");
}

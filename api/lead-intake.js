// In-memory rate limit store. This resets on every cold start and is
// not shared across concurrent function instances, so it is a
// best-effort deterrent against rapid repeated submits from the same
// warm instance, not a guaranteed global limit. It sits behind the
// honeypot as a second, weaker layer, not a replacement for it.
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Confirmation email sent back to the visitor, once the internal
// notification to info@miloop.ai has already gone out. Kept intentionally
// short. Language matches whatever step 0 of the panel recorded.
const CONFIRMATION_COPY = {
  en: {
    subject: "Thanks for reaching out to Miloop AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for telling us about your project. We've received your message and will follow up within 1 to 2 business days.\n\nIf anything changes in the meantime, just reply to this email.\n\nMiloop AI`,
  },
  "zh-Hans": {
    subject: "感谢您联系Miloop AI",
    body: (name) =>
      `您好，${name}：\n\n感谢您告诉我们您的项目情况。我们已经收到您的信息，会在1至2个工作日内与您联系。\n\n如果这段时间有任何变化，直接回复这封邮件就可以。\n\nMiloop AI`,
  },
  "zh-Hant": {
    subject: "感謝您聯繫Miloop AI",
    body: (name) =>
      `您好，${name}：\n\n感謝您告訴我們您的專案情況。我們已經收到您的資訊，會在1至2個工作日內與您聯繫。\n\n如果這段時間有任何變化，直接回覆這封郵件就可以。\n\nMiloop AI`,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload = req.body || {};

  // Honeypot: real visitors never see or fill this field, since it is
  // visually hidden and removed from the tab order. If it has a value,
  // respond as if the submission succeeded, so a bot has no signal
  // telling it to change approach, but skip sending the actual email.
  if (payload.website) {
    console.log("Honeypot triggered, discarding submission");
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

    // Best-effort visitor confirmation. The lead itself already reached
    // info@miloop.ai above, that is the part that must not fail. If this
    // second send errors, log it and still report success to the visitor,
    // rather than surfacing a failure for something that already worked.
    sendConfirmationEmail(payload).catch((error) => {
      console.error("Confirmation email failed", error);
    });

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

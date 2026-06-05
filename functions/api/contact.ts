interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Honeypot — bots fill this, humans don't see it. Pretend success.
  if (typeof data.company_website === "string" && data.company_website.trim() !== "") {
    return json({ ok: true });
  }

  const str = (v: unknown, max = 2000) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const first = str(data.first, 100);
  const last = str(data.last, 100);
  const email = str(data.email, 200);
  const org = str(data.org, 200);
  const interest = str(data.interest, 200);
  const details = str(data.details, 5000);

  if (!first || !last || !email || !details) {
    return json({ ok: false, error: "Missing required fields" }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Invalid email address" }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: "Email service is not configured" }, 500);
  }

  const subject = `New project inquiry — ${first} ${last}`;

  const rows: Array<[string, string]> = [
    ["First name", first],
    ["Last name", last],
    ["Email", email],
    ["Organisation", org || "—"],
    ["Project type", interest || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project details:",
    details,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">New project inquiry</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#666">Project details</h3>
      <div style="white-space:pre-wrap;padding:12px;background:#f6f6f6;border-radius:6px">${escapeHtml(details)}</div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error", res.status, body);
    return json({ ok: false, error: "Failed to send message" }, 502);
  }

  return json({ ok: true });
};
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      first: String(fd.get("first") || ""),
      last: String(fd.get("last") || ""),
      email: String(fd.get("email") || ""),
      org: String(fd.get("org") || ""),
      interest: String(fd.get("interest") || ""),
      details: String(fd.get("details") || ""),
      company_website: String(fd.get("company_website") || ""),
    };
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  const sent = status === "sent";
  const sending = status === "sending";

  return (
    <section id="contact" className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-display text-muted-foreground">Contact</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">
            Start a conversation about your project.
          </h2>
          <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            Custom home, Passive House, land development or construction management — share a few
            details about your project and we'll be in touch to discuss next steps.
          </p>
        </div>
        <form className="md:col-span-7 grid gap-6" onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="First name" name="first" required />
            <Field label="Last name" name="last" required />
          </div>
          <Field label="Email" name="email" type="email" required />
          <Field label="Organisation" name="org" />
          <Field label="Project type" name="interest" placeholder="Custom home, Passive House, land development, CM…" />
          <div className="grid gap-2">
            <label htmlFor="details" className="text-xs uppercase tracking-display text-muted-foreground">Project details *</label>
            <textarea
              id="details"
              name="details"
              required
              rows={5}
              className="border-b border-border bg-transparent py-2 outline-none focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={sending || sent}
            className="mt-4 inline-flex w-fit items-center gap-3 border border-foreground px-8 py-4 text-xs uppercase tracking-display hover:bg-foreground hover:text-background transition-colors disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            {sent ? "Message sent ✓" : sending ? "Sending…" : "Send message"}
            <span aria-hidden>→</span>
          </button>
          {status === "error" && errorMsg && (
            <p className="text-sm text-red-600" role="alert">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-xs uppercase tracking-display text-muted-foreground" htmlFor={name}>
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border-b border-border bg-transparent py-2 outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, Copy, Check, ArrowUpRight, Info } from "lucide-react";
import emailjs from "@emailjs/browser";
import { meta } from "@/data/portfolio";
import { toast } from "@/hooks/use-toast";
import { showAchievement } from "@/lib/achievement";
import { useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import SectionHeader from "@/components/ui/SectionHeader";
import "@/styles/contact.css";

/** "https://github.com/Name" -> "Name"; "https://linkedin.com/in/slug" -> "in/slug". */
function handleFromUrl(url: string, keepPrefix = false): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return keepPrefix ? parts.join("/") : (parts.pop() ?? url);
  } catch {
    return url;
  }
}

const contactMethods = [
  { icon: Mail, label: "Email", value: meta.email, href: `mailto:${meta.email}`, copy: true },
  { icon: Phone, label: "Phone", value: meta.phone, href: `tel:${meta.phone.replace(/\s/g, "")}`, copy: true },
  { icon: MapPin, label: "Location", value: meta.location, href: null, copy: false },
] as const;

const socialLinks = [
  { icon: Github, label: "GitHub", href: meta.github, handle: handleFromUrl(meta.github) },
  { icon: Linkedin, label: "LinkedIn", href: meta.linkedin, handle: handleFromUrl(meta.linkedin, true) },
] as const;

/** Reads a text field from FormData as a trimmed string (File entries and missing fields become ""). */
function readField(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
} as const;

const FORM_CONFIGURED = Boolean(
  EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
);

/* ── Validation (mirrors the native attributes on the inputs, but trims whitespace) ── */
type FieldName = "user_name" | "user_email" | "subject" | "message";
const FIELD_NAMES: readonly FieldName[] = ["user_name", "user_email", "subject", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

function validateField(name: FieldName, raw: string): string {
  const v = raw.trim();
  switch (name) {
    case "user_name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Your name should be at least 2 characters.";
      return "";
    case "user_email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "That email address doesn't look right.";
      return "";
    case "subject":
      return v ? "" : "Please add a short subject.";
    case "message":
      if (!v) return "Please write a message.";
      if (v.length < MESSAGE_MIN) return `Please write at least ${MESSAGE_MIN} characters.`;
      return "";
  }
}

const isFieldName = (name: string): name is FieldName => (FIELD_NAMES as readonly string[]).includes(name);

/** Copies text, falling back to a hidden textarea for browsers/contexts without the async API. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button
        type="button"
        className="copy-btn"
        data-copied={copied}
        onClick={() => void handleCopy()}
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        <span key={copied ? "done" : "idle"} className="copy-icon" aria-hidden="true">
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </span>
        <span className="copy-tip" aria-hidden="true">
          Copied
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </>
  );
}

type Status = "idle" | "loading" | "success";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successTimer = useRef<number | undefined>(undefined);

  const [status, setStatus] = useState<Status>("idle");
  const [messageLength, setMessageLength] = useState(0);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => () => window.clearTimeout(successTimer.current), []);
  useSpotlight(infoRef);

  useGsap(rootRef, ({ reveal }, root) => {
    const grid = root.querySelector(".contact-grid");
    reveal(root.querySelectorAll(".contact-availability, .contact-method, .contact-social"), {
      trigger: grid,
      x: -28,
      y: 16,
      stagger: 0.09,
      start: "top 82%",
    });
    reveal(root.querySelector(".contact-form-card"), { trigger: grid, y: 44, delay: 0.1, start: "top 82%" });
    reveal(root.querySelectorAll(".contact-form-head, .field, .contact-submit-wrap"), {
      trigger: grid,
      y: 18,
      delay: 0.32,
      duration: 0.7,
      stagger: 0.07,
      start: "top 82%",
    });
  });

  const validateOne = (name: FieldName, value: string) =>
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const t = e.target as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (!isFieldName(t.name)) return;
    setTouched((prev) => ({ ...prev, [t.name]: true }));
    validateOne(t.name, t.value);
  };

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    const t = e.target as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (!isFieldName(t.name)) return;
    if (t.name === "message") setMessageLength(t.value.length);
    if (touched[t.name]) validateOne(t.name, t.value);
    if (submitError) setSubmitError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never see or fill this field. Pretend success to bots.
    if (readField(formData, "website") !== "") {
      form.reset();
      return;
    }

    // Validate everything up front; surface all problems and focus the first one.
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const name of FIELD_NAMES) nextErrors[name] = validateField(name, readField(formData, name));
    setTouched({ user_name: true, user_email: true, subject: true, message: true });
    setErrors(nextErrors);
    const firstInvalid = FIELD_NAMES.find((name) => nextErrors[name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS is not configured (VITE_EMAILJS_* variables are missing).");
      toast({
        title: "Contact form unavailable",
        description: `The form isn't available right now. Please email me directly at ${meta.email}.`,
        variant: "destructive",
      });
      return;
    }

    const templateParams = {
      user_name: readField(formData, "user_name"),
      user_email: readField(formData, "user_email"),
      subject: readField(formData, "subject"),
      message: readField(formData, "message"),
    };

    setStatus("loading");
    setSubmitError(false);
    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon InshaAllah.",
      });
      showAchievement("Message Sent", "Thanks for reaching out!");
      form.reset();
      setMessageLength(0);
      setTouched({});
      setErrors({});
      setStatus("success");
      window.clearTimeout(successTimer.current);
      successTimer.current = window.setTimeout(() => setStatus("idle"), 4200);
    } catch (error: unknown) {
      console.error("Email send error:", error);
      setStatus("idle");
      setSubmitError(true);
      toast({
        title: "Failed to send message",
        description: `Something went wrong on my end. Please try again, or email me directly at ${meta.email}.`,
        variant: "destructive",
      });
    }
  };

  /** Shared props/markup for a text field so each stays declarative below. */
  const fieldState = (name: FieldName) =>
    !touched[name] ? undefined : errors[name] ? "invalid" : errors[name] === "" ? "valid" : undefined;
  const nearLimit = messageLength >= MESSAGE_MAX * 0.9;

  return (
    <section ref={rootRef} id="contact" className="section section-contact contact" aria-labelledby="contact-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Get in touch"
          title="Let's build something together"
          description="I'm open to collaborations, internships and new opportunities. Send a message and I'll get back to you."
          titleId="contact-title"
        />

        <div className="contact-grid">
          {/* ── Left: availability + ways to reach me ── */}
          <div ref={infoRef} className="contact-info">
            <p className="contact-availability">
              <span className="status-dot" aria-hidden="true" />
              {meta.availability}
            </p>

            <ul className="contact-methods">
              {contactMethods.map(({ icon: Icon, label, value, href, copy }) => {
                const body = (
                  <>
                    <span className="contact-method-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="contact-method-label">{label}</span>
                      <span className="contact-method-value">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label} className="card spotlight contact-method">
                    {href ? (
                      <a href={href} className="contact-method-main">
                        {body}
                      </a>
                    ) : (
                      <div className="contact-method-main">{body}</div>
                    )}
                    {copy && <CopyButton value={value} label={label} />}
                  </li>
                );
              })}
            </ul>

            <div className="contact-socials">
              {socialLinks.map(({ icon: Icon, label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile, ${handle} (opens in a new tab)`}
                  className="card spotlight contact-social"
                >
                  <span className="contact-method-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="contact-social-name">{label}</span>
                    <span className="contact-social-handle">{handle}</span>
                  </span>
                  <ArrowUpRight size={18} className="contact-social-arrow" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: the form ── */}
          <div className="card card-pad contact-form-card">
            <div className="contact-form-head">
              <h3>Send me a message</h3>
              <p>Tell me about your project or opportunity and I'll reply by email.</p>
            </div>

            {!FORM_CONFIGURED && (
              <p className="contact-unavailable" role="note">
                <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span>
                  The form isn't available right now. Please email me directly at{" "}
                  <a href={`mailto:${meta.email}`}>{meta.email}</a>.
                </span>
              </p>
            )}

            <form
              ref={formRef}
              onSubmit={(e) => void handleSubmit(e)}
              onBlur={handleBlur}
              onInput={handleInput}
              className="contact-form"
              aria-busy={status === "loading"}
              noValidate
            >
              {/* Honeypot (hidden from people and assistive tech; bots tend to fill it) */}
              <div aria-hidden="true" className="contact-hp">
                <label htmlFor="website">Leave this field empty</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="contact-form-row">
                <div className="field" data-state={fieldState("user_name")}>
                  <label htmlFor="user_name" className="field-label">
                    Your name
                  </label>
                  <div className="field-wrap">
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="field-control"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="John Doe"
                      aria-invalid={fieldState("user_name") === "invalid"}
                      aria-describedby="user_name-error"
                    />
                    <Check size={18} className="field-ok" aria-hidden="true" />
                  </div>
                  <div className="field-foot">
                    <p id="user_name-error" className="field-error" aria-live="polite">
                      {touched.user_name ? errors.user_name : ""}
                    </p>
                  </div>
                </div>

                <div className="field" data-state={fieldState("user_email")}>
                  <label htmlFor="user_email" className="field-label">
                    Your email
                  </label>
                  <div className="field-wrap">
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      className="field-control"
                      required
                      maxLength={254}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="john@example.com"
                      aria-invalid={fieldState("user_email") === "invalid"}
                      aria-describedby="user_email-error"
                    />
                    <Check size={18} className="field-ok" aria-hidden="true" />
                  </div>
                  <div className="field-foot">
                    <p id="user_email-error" className="field-error" aria-live="polite">
                      {touched.user_email ? errors.user_email : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="field" data-state={fieldState("subject")}>
                <label htmlFor="subject" className="field-label">
                  Subject
                </label>
                <div className="field-wrap">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="field-control"
                    required
                    maxLength={150}
                    autoComplete="off"
                    placeholder="Project inquiry"
                    aria-invalid={fieldState("subject") === "invalid"}
                    aria-describedby="subject-error"
                  />
                  <Check size={18} className="field-ok" aria-hidden="true" />
                </div>
                <div className="field-foot">
                  <p id="subject-error" className="field-error" aria-live="polite">
                    {touched.subject ? errors.subject : ""}
                  </p>
                </div>
              </div>

              <div className="field" data-state={fieldState("message")}>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <div className="field-wrap">
                  <textarea
                    id="message"
                    name="message"
                    className="field-control"
                    required
                    minLength={MESSAGE_MIN}
                    maxLength={MESSAGE_MAX}
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={fieldState("message") === "invalid"}
                    aria-describedby="message-error message-count"
                  />
                </div>
                <div className="field-foot">
                  <p id="message-error" className="field-error" aria-live="polite">
                    {touched.message ? errors.message : ""}
                  </p>
                  <p id="message-count" className="field-count" data-near={nearLimit}>
                    {messageLength.toLocaleString("en-US")} / {MESSAGE_MAX.toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              <div className="contact-submit-wrap">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg contact-submit"
                  data-state={status}
                  disabled={status !== "idle"}
                >
                  {status === "idle" && (
                    <span key="idle" className="contact-submit-state">
                      <Send size={18} className="send-icon" aria-hidden="true" />
                      Send message
                    </span>
                  )}
                  {status === "loading" && (
                    <span key="loading" className="contact-submit-state">
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Sending...
                    </span>
                  )}
                  {status === "success" && (
                    <span key="success" className="contact-submit-state">
                      <svg
                        className="check-draw"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" pathLength={1} />
                        <path d="M7.5 12.5l3 3 6-6.5" pathLength={1} />
                      </svg>
                      Message sent
                    </span>
                  )}
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {status === "success" ? "Your message was sent." : submitError ? "Your message could not be sent." : ""}
                </span>
                <p className="contact-fallback">
                  Prefer email? Write to <a href={`mailto:${meta.email}`}>{meta.email}</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

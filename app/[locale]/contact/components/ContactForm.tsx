"use client";

import { useRef, useState } from "react";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import { CTAButton, EyebrowBadge } from "@/lib/ui";

type Props = {
  locale: Locale;
  /** Destination address for the mailto: link. */
  email: string;
};

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Swiss uppercase field label (typography-scale.md "Section label").
const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/50";
// Outlined input on the white card surface. 16px text (≥16px prevents iOS zoom,
// per Rauno). Only compositor-friendly properties transition; the accent focus
// ring is the global box-shadow, here paired with a subtle border-color shift.
const fieldBase =
  "mt-2 w-full rounded-lg border bg-card px-3.5 py-3 text-base text-foreground transition-colors placeholder:text-foreground/35 focus:border-foreground/30";

/**
 * ContactForm
 *
 * The dominant element of the contact page (there is no marketing headline by
 * design). Honest, backend-free: validates inline, then opens the visitor's mail
 * client (mailto:) with the message pre-filled — no fake "sent" state.
 *
 * Wiki form checklist: <form> wrapping (Enter submits), labels wired with htmlFor
 * (click-to-focus), Swiss uppercase labels above the field (never placeholder-as-
 * label), inline per-field errors (no global toast), focus moves to first invalid
 * field, aria-invalid / aria-describedby, button disabled to prevent double-fire.
 */
export function ContactForm({ locale, email }: Props) {
  const t = (key: string) => getTranslation(locale, key);

  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (sent) setSent(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const next: FieldErrors = {};
    if (!name.trim()) next.name = t("contact.form.errors.name");
    if (!EMAIL_RE.test(senderEmail.trim()))
      next.email = t("contact.form.errors.email");
    if (!message.trim()) next.message = t("contact.form.errors.message");

    if (next.name || next.email || next.message) {
      setErrors(next);
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setErrors({});

    const subject = t("contact.form.subject").replace("{name}", name.trim());
    const signature = company.trim()
      ? `${name.trim()} · ${company.trim()}`
      : name.trim();
    const body = [message.trim(), "", "—", signature, senderEmail.trim()].join(
      "\n"
    );

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <EyebrowBadge>{t("contact.form.heading")}</EyebrowBadge>

      {/* Name + Company on one row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t("contact.form.name.label")}
          </label>
          <input
            id="contact-name"
            ref={nameRef}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            placeholder={t("contact.form.name.placeholder")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldBase} ${
              errors.name ? "border-red-400" : "border-border"
            }`}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClass}>
            {t("contact.form.company.label")}{" "}
            <span className="tracking-normal text-foreground/30 normal-case">
              · {t("contact.form.company.optional")}
            </span>
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t("contact.form.company.placeholder")}
            className={`${fieldBase} border-border`}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {t("contact.form.email.label")}
        </label>
        <input
          id="contact-email"
          ref={emailRef}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={senderEmail}
          onChange={(e) => {
            setSenderEmail(e.target.value);
            clearError("email");
          }}
          placeholder={t("contact.form.email.placeholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={`${fieldBase} ${
            errors.email ? "border-red-400" : "border-border"
          }`}
        />
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="mt-1.5 text-xs text-red-600"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("contact.form.message.label")}
        </label>
        <textarea
          id="contact-message"
          ref={messageRef}
          name="message"
          rows={3}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          placeholder={t("contact.form.message.placeholder")}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`${fieldBase} resize-y ${
            errors.message ? "border-red-400" : "border-border"
          }`}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-xs text-red-600"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-1">
        <CTAButton
          type="submit"
          variant="primary"
          ariaLabel={t("contact.form.submitAriaLabel")}
        >
          {t("contact.form.submit")}
        </CTAButton>

        {sent && (
          <p
            role="status"
            className="mt-3 text-sm font-medium text-foreground/70"
          >
            {t("contact.form.success")}
          </p>
        )}
      </div>
    </form>
  );
}

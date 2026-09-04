"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3.5 text-[0.9375rem] text-foreground outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:shadow-[0_0_0_4px_rgba(15,118,110,0.08)]";

const inputClassCompact =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-[0.9375rem] text-foreground outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:shadow-[0_0_0_4px_rgba(15,118,110,0.08)]";

function Field({
  label,
  htmlFor,
  error,
  children,
  compact = false,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(compact ? "space-y-1.5" : "space-y-2.5", className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type LeadFormProps = {
  source?: string;
  idPrefix?: string;
  submitLabel?: string;
  className?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

export function LeadForm({
  source = "contact",
  idPrefix = "lead",
  submitLabel = "Get Free Estimate",
  className,
  compact = false,
  onSuccess,
}: LeadFormProps) {
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      details: "",
      website: "",
      source,
    },
  });

  function markFormStart() {
    if (formStarted) return;
    setFormStarted(true);
    trackEvent("contact_form_start", { source });
  }

  async function onSubmit(values: ContactFormValues) {
    setServerMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setServerMessage({
          type: "error",
          text:
            data.error ||
            "Unable to send your message. Please try again or email me directly.",
        });
        return;
      }
      trackEvent("contact_form_submit", { source });
      setServerMessage({
        type: "success",
        text: data.message || "Thanks — your details were sent successfully.",
      });
      setSubmitted(true);
      reset({ name: "", email: "", phone: "", details: "", website: "", source });
      setFormStarted(false);
      onSuccess?.();
    } catch {
      setServerMessage({
        type: "error",
        text: "Network error. Please try again or reach out on WhatsApp/email.",
      });
    }
  }

  if (submitted) {
    return (
      <div
        className={cn("rounded-2xl bg-white p-6 text-foreground sm:p-7", className)}
        role="status"
      >
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
          Details received
        </h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out. I&apos;ll review your requirement and reply
          with next steps — including estimate timing where possible.
        </p>
        <Button
          type="button"
          magnetic
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setServerMessage(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const phoneId = `${idPrefix}-phone`;
  const detailsId = `${idPrefix}-details`;
  const websiteId = `${idPrefix}-website`;
  const fieldInput = compact ? inputClassCompact : inputClass;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={markFormStart}
      className={cn(
        "rounded-2xl bg-white p-6 text-foreground shadow-[var(--shadow-md)] sm:p-7",
        className,
      )}
      noValidate
    >
      <div
        className={cn(
          "grid",
          compact ? "gap-3 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3" : "gap-6 sm:gap-7",
        )}
      >
        <Field
          label="Name"
          htmlFor={nameId}
          error={errors.name?.message}
          compact={compact}
        >
          <input
            id={nameId}
            className={fieldInput}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            {...register("name")}
          />
        </Field>
        <Field
          label="Email"
          htmlFor={emailId}
          error={errors.email?.message}
          compact={compact}
        >
          <input
            id={emailId}
            type="email"
            className={fieldInput}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            {...register("email")}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor={phoneId}
          error={errors.phone?.message}
          compact={compact}
          className={compact ? "sm:col-span-2" : undefined}
        >
          <input
            id={phoneId}
            type="tel"
            className={fieldInput}
            placeholder="+1 555 000 1234"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Your requirement"
          htmlFor={detailsId}
          error={errors.details?.message}
          compact={compact}
          className={compact ? "sm:col-span-2" : undefined}
        >
          <textarea
            id={detailsId}
            rows={compact ? 2 : 5}
            className={cn(
              fieldInput,
              "resize-y",
              compact ? "min-h-[3.25rem]" : "min-h-[7.5rem]",
            )}
            placeholder="Tell me about your website, store or app…"
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={errors.details ? `${detailsId}-error` : undefined}
            {...register("details")}
          />
        </Field>
      </div>

      <div className="sr-only" aria-hidden>
        <label htmlFor={websiteId}>Website</label>
        <input
          id={websiteId}
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {serverMessage ? (
        <p
          role="status"
          className={cn(
            "mt-4 rounded-lg border px-4 py-3 text-sm",
            serverMessage.type === "success"
              ? "border-success/30 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger",
          )}
        >
          {serverMessage.text}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        magnetic
        className={cn("w-full sm:w-auto", compact ? "mt-4" : "mt-7")}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}

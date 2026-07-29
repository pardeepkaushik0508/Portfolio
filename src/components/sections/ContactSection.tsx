"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  contactBudgetOptions,
  contactFormSchema,
  contactProjectTypeOptions,
  contactTimelineOptions,
  type ContactFormValues,
} from "@/lib/validations";
import { personal } from "@/data/personal";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-3 text-[0.9375rem] text-foreground outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted"
      >
        {label}
        {optional ? (
          <span className="normal-case tracking-normal"> (optional)</span>
        ) : null}
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

export function ContactSection() {
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
      projectType: undefined,
      details: "",
      budget: "",
      timeline: "",
      website: "",
    },
  });

  function markFormStart() {
    if (formStarted) return;
    setFormStarted(true);
    trackEvent("contact_form_start");
  }

  async function onSubmit(values: ContactFormValues) {
    setServerMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      trackEvent("contact_form_submit", { project_type: values.projectType });
      setServerMessage({
        type: "success",
        text: data.message || "Thanks — your project details were sent successfully.",
      });
      setSubmitted(true);
      reset();
      setFormStarted(false);
    } catch {
      setServerMessage({
        type: "error",
        text: "Network error. Please try again or reach out on WhatsApp/email.",
      });
    }
  }

  return (
    <section id="contact" className="bg-background pt-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="container-shell">
        <div className="section-ink overflow-hidden rounded-t-[1.25rem] border border-b-0 border-border-dark text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)]">
          <div className="grid gap-10 px-6 py-12 sm:px-8 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-14">
            <Reveal>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                Contact
              </p>
              <TypedHeading
                text="Have a project that needs proper execution?"
                className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em]"
              />
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-on-dark-muted md:text-base">
                Share what you are building and where you need support. I can help
                with full-stack development, WordPress, Shopify, WooCommerce,
                redesign, optimization or deployment.
              </p>

              <div className="mt-8 space-y-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-on-dark-muted">
                  Prefer a direct channel?
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${personal.email}`}
                    onClick={() =>
                      trackEvent("email_click", { location: "contact" })
                    }
                    className="rounded-lg border border-border-dark bg-dark-elevated px-4 py-2.5 text-sm text-on-dark transition hover:border-accent hover:text-accent"
                  >
                    Email
                  </a>
                  <a
                    href={personal.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { location: "contact" })
                    }
                    className="rounded-lg border border-border-dark bg-dark-elevated px-4 py-2.5 text-sm text-on-dark transition hover:border-accent hover:text-accent"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={personal.resume}
                    download
                    onClick={() =>
                      trackEvent("resume_download", { location: "contact" })
                    }
                    className="rounded-lg border border-border-dark bg-dark-elevated px-4 py-2.5 text-sm text-on-dark transition hover:border-accent hover:text-accent"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              {submitted ? (
                <div
                  id="thank-you"
                  className="rounded-2xl bg-white p-7 text-foreground sm:p-8"
                  role="status"
                >
                  <CheckCircle2 className="size-10 text-success" aria-hidden />
                  <h3 className="mt-5 font-display text-2xl tracking-tight">
                    Project details received
                  </h3>
                  <p className="mt-3 text-muted">
                    Thanks for reaching out. I’ll review what you shared and reply
                    with next steps.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setServerMessage(null);
                      }}
                    >
                      Send another message
                    </Button>
                    <Button href="#work" variant="dark">
                      Back to work
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onFocusCapture={markFormStart}
                  className="rounded-2xl bg-white p-6 text-foreground shadow-[var(--shadow-md)] sm:p-8"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name" error={errors.name?.message}>
                      <input
                        id="name"
                        className={inputClass}
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email" error={errors.email?.message}>
                      <input
                        id="email"
                        type="email"
                        className={inputClass}
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                    </Field>
                    <Field
                      label="Project Type"
                      htmlFor="projectType"
                      error={errors.projectType?.message}
                    >
                      <select
                        id="projectType"
                        className={inputClass}
                        aria-invalid={errors.projectType ? true : undefined}
                        aria-describedby={
                          errors.projectType ? "projectType-error" : undefined
                        }
                        {...register("projectType")}
                      >
                        <option value="">Select a project type</option>
                        {contactProjectTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="Budget Range"
                      htmlFor="budget"
                      optional
                      error={errors.budget?.message}
                    >
                      <select
                        id="budget"
                        className={inputClass}
                        {...register("budget")}
                      >
                        <option value="">Prefer not to say</option>
                        {contactBudgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field
                        label="Expected Timeline"
                        htmlFor="timeline"
                        optional
                        error={errors.timeline?.message}
                      >
                        <select
                          id="timeline"
                          className={inputClass}
                          {...register("timeline")}
                        >
                          <option value="">Prefer not to say</option>
                          {contactTimelineOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Field
                      label="Project Details"
                      htmlFor="details"
                      error={errors.details?.message}
                    >
                      <textarea
                        id="details"
                        rows={4}
                        className={cn(inputClass, "resize-y")}
                        placeholder="Goals, pages, platform preferences, deadline…"
                        aria-invalid={errors.details ? true : undefined}
                        aria-describedby={
                          errors.details ? "details-error" : undefined
                        }
                        {...register("details")}
                      />
                    </Field>
                  </div>

                  <div className="sr-only" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  {serverMessage ? (
                    <p
                      role="status"
                      className={cn(
                        "mt-5 rounded-lg border px-4 py-3 text-sm",
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
                    className="mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Send Project Details"
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

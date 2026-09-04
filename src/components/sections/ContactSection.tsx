"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  contactBudgetOptions,
  contactFormSchema,
  contactProjectTypeOptions,
  contactTimelineOptions,
  type ContactFormValues,
} from "@/lib/validations";
import { personal } from "@/data/personal";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { AmbientOrb, Floating } from "@/components/motion/Floating";
import { TiltCard } from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/Button";
import { useFinePointer } from "@/hooks/useFinePointer";
import { DURATION, EASE } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-3 text-[0.9375rem] text-foreground outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:shadow-[0_0_0_4px_rgba(15,118,110,0.08)]";

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
  const shellRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

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

  function onSpotMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!fine || reduced || !shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    shellRef.current.style.setProperty("--spot-x", `${x}%`);
    shellRef.current.style.setProperty("--spot-y", `${y}%`);
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

  const channels = [
    {
      label: "Email",
      href: `mailto:${personal.email}`,
      onClick: () => trackEvent("email_click", { location: "contact" }),
    },
    {
      label: "WhatsApp",
      href: personal.whatsapp,
      external: true,
      onClick: () => trackEvent("whatsapp_click", { location: "contact" }),
    },
    {
      label: "Download Resume",
      href: personal.resume,
      download: true,
      onClick: () => trackEvent("resume_download", { location: "contact" }),
    },
  ];

  return (
    <section id="contact" className="bg-background pt-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="container-shell">
        <div
          ref={shellRef}
          onMouseMove={onSpotMove}
          className="contact-spotlight-host section-ink relative overflow-hidden rounded-t-[1.25rem] border border-b-0 border-border-dark text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)]"
        >
          <div className="contact-spotlight" aria-hidden />
          <AmbientOrb
            className="-right-20 -top-10 size-[22rem] opacity-70"
            color="primary"
          />
          <Floating
            amplitude={12}
            duration={8}
            className="pointer-events-none absolute bottom-8 left-8 size-24 rounded-full border border-white/10 opacity-30"
          />

          <div className="relative grid gap-10 px-6 py-12 sm:px-8 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-14">
            <Reveal variant="rotate-in">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                Contact
              </p>
              {reduced ? (
                <TypedHeading
                  text="Have a project that needs proper execution?"
                  className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em]"
                />
              ) : (
                <TextReveal
                  text="Have a project that needs proper execution?"
                  as="h2"
                  mode="words"
                  className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em]"
                />
              )}
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
                  {channels.map((ch) => (
                    <TiltCard key={ch.label} intensity={6} lift={6}>
                      <a
                        href={ch.href}
                        target={ch.external ? "_blank" : undefined}
                        rel={ch.external ? "noopener noreferrer" : undefined}
                        download={ch.download}
                        onClick={ch.onClick}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-border-dark bg-dark-elevated px-4 py-2.5 text-sm text-on-dark transition duration-200 hover:border-accent hover:text-accent"
                      >
                        {ch.label}
                      </a>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="depth" delay={0.1}>
              {submitted ? (
                <motion.div
                  id="thank-you"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: DURATION.reveal, ease: EASE.out }}
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
                      magnetic
                      onClick={() => {
                        setSubmitted(false);
                        setServerMessage(null);
                      }}
                    >
                      Send another message
                    </Button>
                    <Button href="#work" variant="dark" magnetic>
                      Back to work
                    </Button>
                  </div>
                </motion.div>
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
                      label="Mobile Number"
                      htmlFor="phone"
                      optional
                      error={errors.phone?.message}
                    >
                      <input
                        id="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        {...register("phone")}
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

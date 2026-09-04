"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { LeadForm } from "@/components/ui/LeadForm";
import { personal } from "@/data/personal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const QUICK_QUESTIONS = [
  {
    id: "new-website",
    label: "I need a new website",
    reply: "I need a new website for my business.",
  },
  {
    id: "shopify",
    label: "Shopify / ecommerce store",
    reply: "I need Shopify or ecommerce store help.",
  },
  {
    id: "speed",
    label: "Fix website speed",
    reply: "I need website speed optimization.",
  },
  {
    id: "redesign",
    label: "Website redesign",
    reply: "I want to redesign my current website.",
  },
  {
    id: "other",
    label: "Something else",
    reply: "I have another project requirement.",
  },
] as const;

const AUTO_OPEN_MS = 60_000;
const SESSION_OPENED_KEY = "pk-chatbot-auto-opened";
const SESSION_DISMISSED_KEY = "pk-chatbot-dismissed";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: `Hi — I'm ${personal.firstName.split(" ")[0]}'s assistant. How can I help your business grow online?`,
    },
    {
      id: "prompt",
      role: "bot",
      text: "Pick a quick option below, then share your details so I can send a free estimate.",
    },
  ]);
  const reduced = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openChat = useCallback((source: string) => {
    setOpen(true);
    trackEvent("chatbot_open", { source });
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Always-visible launcher; auto-open after 1 minute (once per session)
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1";
      if (sessionStorage.getItem(SESSION_OPENED_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(SESSION_OPENED_KEY) === "1") return;
        if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") return;
        sessionStorage.setItem(SESSION_OPENED_KEY, "1");
      } catch {
        /* ignore */
      }
      if (!dismissed) openChat("auto_1min");
    }, AUTO_OPEN_MS);

    return () => window.clearTimeout(timer);
  }, [openChat]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, showForm, open]);

  function handleQuickQuestion(item: (typeof QUICK_QUESTIONS)[number]) {
    if (selectedTopic) return;
    setSelectedTopic(item.id);
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text: item.reply },
      {
        id: uid(),
        role: "bot",
        text: "Great — share your name, email, phone and a short requirement. I'll reply with next steps and a free estimate.",
      },
    ]);
    setShowForm(true);
    trackEvent("chatbot_quick_reply", { option: item.id });
  }

  return (
    <div className="site-chatbot pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 max-[430px]:bottom-4 max-[430px]:right-4">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto flex h-[min(70vh,520px)] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_64px_rgba(12,18,16,0.22)]"
          >
            <header className="flex items-start justify-between gap-3 bg-dark px-4 py-3.5 text-white">
              <div>
                <p id={titleId} className="font-display text-base font-semibold tracking-tight">
                  Chat with Pardeep
                </p>
                <p className="mt-0.5 text-xs text-on-dark-muted">
                  Free estimate · Usually replies same day
                </p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="size-3.5" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-[#f4f7f8] px-3.5 py-3.5"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "bot"
                      ? "rounded-tl-md bg-white text-foreground shadow-sm"
                      : "ml-auto rounded-tr-md bg-primary text-white",
                  )}
                >
                  {msg.text}
                </div>
              ))}

              {!showForm ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleQuickQuestion(q)}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-left text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
                  <p className="mb-3 font-display text-sm font-semibold tracking-tight">
                    Send your details
                  </p>
                  <LeadForm
                    source="chatbot"
                    idPrefix="chatbot"
                    submitLabel="Send message"
                    compact
                    className="!shadow-none !rounded-none !bg-transparent !p-0"
                    onSuccess={() => {
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: uid(),
                          role: "bot",
                          text: "Thanks — your details were sent. I'll review and get back to you soon.",
                        },
                      ]);
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => (open ? closeChat() : openChat("launcher"))}
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(15,118,110,0.35)] transition hover:bg-primary-hover"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X className="size-4" aria-hidden />
        ) : (
          <MessageCircle className="size-4" aria-hidden />
        )}
        <span className="pr-0.5">{open ? "Close" : "Chat"}</span>
        {!open ? (
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
        ) : null}
      </button>
    </div>
  );
}

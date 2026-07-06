"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Send, Download } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Magnetic } from "@/components/experience/magnetic";
import { Reveal, SplitText } from "@/components/experience/reveal";
import { personalInfo } from "@/lib/data";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — fail silently
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor="link"
      className="flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 shrink-0"
      style={{
        border: `1px solid ${copied ? "var(--accent)" : "var(--line-strong)"}`,
        color: copied ? "var(--accent)" : "var(--muted)",
      }}
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className="flex"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block group/field">
      <span className="hud !text-[10px] block mb-2 transition-colors duration-300 group-focus-within/field:!text-[var(--accent)]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-[border-color,box-shadow] duration-300 " +
  "placeholder:text-[var(--faint)] focus:shadow-[0_0_0_1px_var(--accent),0_0_28px_var(--accent-soft)]";

const inputStyle: React.CSSProperties = {
  background: "color-mix(in srgb, var(--bg-elev) 70%, transparent)",
  border: "1px solid var(--line)",
  color: "var(--ink)",
};

export function Transmit() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Let's Connect — ${name || "Saw Your Portfolio"}`;
    const body = `Hi Sashen,\n\n${message}\n\nBest regards,\n${name}${from ? `\n${from}` : ""}`;
    const url = `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="transmit" className="scene" aria-label="Contact">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="hud mb-6">
            <span className="hud-accent">05</span> — Transmit
          </p>
        </Reveal>

        <h2
          className="text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.0] tracking-tight mb-8 max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText text="Let's build something" per="word" className="block" />
          <SplitText text="great together." per="word" delay={0.15} className="block text-signal" />
        </h2>

        <Reveal delay={0.1}>
          <p className="max-w-lg text-base leading-relaxed mb-16" style={{ color: "var(--muted)" }}>
            I&apos;m always open to interesting projects, collaborations, or just a good tech
            conversation. Reach out — I respond fast.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-start">
          {/* Floating glass form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="glass rounded-3xl p-7 sm:p-9 relative overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className={inputClass}
                    style={inputStyle}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Your email">
                  <input
                    type="email"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="ada@analytical.engine"
                    className={inputClass}
                    style={inputStyle}
                    autoComplete="email"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Message">
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I came across your portfolio and…"
                    rows={5}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </Field>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    data-cursor="link"
                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_36px_var(--accent-glow)]"
                    style={{ background: "var(--accent)", color: "#04141a" }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {sent ? (
                        <motion.span
                          key="sent"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-2.5"
                        >
                          <Check size={15} />
                          Signal transmitted
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-2.5"
                        >
                          <Send size={15} />
                          Transmit message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </Magnetic>
                <span className="hud !text-[10px]">Opens Gmail — nothing stored</span>
              </div>

              {/* Success wash */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(600px circle at 20% 90%, var(--accent-soft), transparent 60%)",
                    }}
                  />
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Direct channels */}
          <div className="space-y-3">
            <Reveal delay={0.2}>
              <div className="glass spot rounded-2xl p-6 flex items-center justify-between gap-4">
                <a
                  href={personalInfo.emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="min-w-0"
                >
                  <span className="hud !text-[10px] block mb-1.5">Direct line</span>
                  <span
                    className="link-sweep text-base sm:text-lg font-semibold tracking-tight break-all"
                    style={{ color: "var(--ink)" }}
                  >
                    {personalInfo.email}
                  </span>
                </a>
                <CopyEmail />
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="glass spot rounded-2xl p-6 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <GithubIcon size={17} />
                  </span>
                  <div>
                    <span className="hud !text-[10px] block mb-0.5">GitHub</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      SashenM001
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--muted)" }}
                />
              </a>
            </Reveal>

            <Reveal delay={0.32}>
              <a
                href={personalInfo.cvPath}
                download
                data-cursor="link"
                className="glass spot rounded-2xl p-6 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <Download size={17} />
                  </span>
                  <div>
                    <span className="hud !text-[10px] block mb-0.5">Résumé</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      Sashen_Matheesha_CV.pdf
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--muted)" }}
                />
              </a>
            </Reveal>

            <Reveal delay={0.38}>
              <p
                className="flex items-center gap-2.5 pt-4 text-[13px]"
                style={{ color: "var(--muted)" }}
              >
                <span
                  className="pulse-dot w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#34d399", color: "#34d399" }}
                />
                Currently available for internships and part-time opportunities
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

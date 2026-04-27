"use client";

import { useEffect, useState } from "react";

interface ShowCountdown {
  number: string;
  dateLabel: string;
  date: Date;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const SHOWS = [
  { number: "Show 1", dateLabel: "28 de Outubro", dateStr: "2026-10-28T20:00:00-03:00" },
  { number: "Show 2", dateLabel: "30 de Outubro", dateStr: "2026-10-30T20:00:00-03:00" },
  { number: "Show 3", dateLabel: "31 de Outubro", dateStr: "2026-10-31T20:00:00-03:00" },
];

function getTimeRemaining(target: Date): Omit<ShowCountdown, "number" | "dateLabel"> {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { date: target, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    date: target,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function DigitBox({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-digit">
        {display}
      </div>
      <span
        className="text-xs uppercase tracking-wider"
        style={{ color: "var(--theme-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="text-2xl font-bold self-start mt-8 animate-pulse"
      style={{ color: "var(--theme-primary)" }}
    >
      :
    </span>
  );
}

export default function CountdownArirang() {
  const [countdowns, setCountdowns] = useState<ShowCountdown[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      setCountdowns(
        SHOWS.map((show) => {
          const target = new Date(show.dateStr);
          const remaining = getTimeRemaining(target);
          return { number: show.number, dateLabel: show.dateLabel, ...remaining };
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section id="countdown" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="h-8 w-48 mx-auto rounded bg-white/5 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="countdown" className="w-full py-[80px] px-[40px] flex flex-col items-center">
      <div className="w-full max-w-6xl">

        {/* Section header */}
        <div className="flex flex-col items-center gap-4 mb-32 animate-fade-in-up">
          <span
            className="text-sm tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--theme-primary)" }}
          >
            🇧🇷 São Paulo, Brasil
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--theme-text)" }}
          >
            Arirang on Stage
          </h2>
          <p
            className="text-center text-lg max-w-2xl mx-auto leading-relaxed mt-2"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Contagem regressiva para o BTS no MorumBIS — Outubro de 2026 💜
          </p>
        </div>

        {/* Countdown cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 w-full pt-10 lg:mt-10  place-items-center">
          {countdowns.map((show, i) => (
            <div
              key={i}
              className="glass-card w-full max-w-[400px] rounded-[32px] pt-24 pb-12 px-8 flex flex-col items-center gap-10 text-center transition-all duration-500 hover:scale-[1.02]"
              style={{
                animationDelay: `${i * 0.15}s`,
                minHeight: "250px"
              }}
            >
              <h3
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--theme-primary)" }}
              >
                {show.dateLabel}
              </h3>

              {show.isPast ? (
                <div className="py-4">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--theme-primary)" }}
                  >
                    🎉 Show Realizado!
                  </span>
                </div>
              ) : (
                <div className="flex items-start justify-center gap-2 sm:gap-2">
                  <DigitBox value={show.days} label="Dias" />
                  <Separator />
                  <DigitBox value={show.hours} label="Hrs" />
                  <Separator />
                  <DigitBox value={show.minutes} label="Min" />
                  <Separator />
                  <DigitBox value={show.seconds} label="Seg" />
                </div>
              )}

              <p
                className="text-sm font-bold tracking-widest"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {show.number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
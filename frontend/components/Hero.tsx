"use client";

import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background Image with Overlay and Transition */}
      <div className="absolute inset-0 overflow-hidden">
        {/* The Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/hero/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5, // Controlled opacity for text legibility
          }}
        />
        
        {/* Radial dark overlay for center focus */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "radial-gradient(circle at center, transparent 0%, var(--theme-bg) 80%)" 
          }}
        />

        {/* Bottom transition gradient to discography */}
        <div 
          className="absolute bottom-0 left-0 w-full h-32 z-10"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--theme-bg))"
          }}
        />
      </div>

      {/* Background gradient orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
          style={{ background: `radial-gradient(circle, var(--theme-primary), transparent)` }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-float"
          style={{
            background: `radial-gradient(circle, var(--theme-accent), transparent)`,
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, var(--theme-primary), transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl">
        {/* BTS Logo */}
        <div className="animate-fade-in-up mb-6">
          <span
            className="text-sm tracking-[0.4em] uppercase font-medium"
            style={{ color: "var(--theme-primary)" }}
          >
            방탄소년단
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 animate-fade-in-up text-glow tracking-tight"
          style={{
            color: "var(--theme-primary)",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          ARMY
         
        </h1>

        <p
          className="text-center text-lg md:text-xl animate-fade-in-up leading-relaxed"
          style={{
            color: "var(--theme-text-muted)",
            animationDelay: "0.3s",
            opacity: 0,
            marginBottom: "2rem",
            marginTop: "1rem",
          }}
        >
          Explore a discografia completa do BTS, acompanhe a contagem regressiva para o{" "}
          <strong style={{ color: "var(--theme-primary)" }}>
            Arirang on Stage
          </strong>{" "}
          no MorumBIS e converse com nosso ARMY Bot com IA 💜
        </p>

        <div
          className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.45s", opacity: 0 }}
        >
          <a href="#albums" className="btn-primary">
            Explorar Discografia
          </a>
          <a href="#countdown" className="btn-ghost">
            Contagem Regressiva
          </a>
          <a href="#chat" className="btn-ghost">
            Pergunte ao ARMY Bot 💬
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: "1.5s", opacity: 0 }}
      >
        <div
          className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          style={{ borderColor: "var(--theme-primary)" }}
        >
          <div
            className="w-1 h-3 rounded-full animate-bounce"
            style={{ background: "var(--theme-primary)" }}
          />
        </div>
      </div>
    </section>
  );
}

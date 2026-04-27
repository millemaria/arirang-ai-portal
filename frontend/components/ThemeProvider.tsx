"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { ThemeConfig } from "@/lib/types";

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  activeAlbumId: number | null;
  setActiveAlbumId: (id: number | null) => void;
}

const defaultTheme: ThemeConfig = {
  bg: "bg-zinc-950",
  primary: "#7C3AED",
  font: "font-sans",
  accent: "#A78BFA",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  activeAlbumId: null,
  setActiveAlbumId: () => {},
});

/**
 * Converts a hex color to RGB values.
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124, 58, 237";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Extracts a background color from a Tailwind bg class name.
 */
function bgClassToColor(bgClass: string): string {
  const colorMap: Record<string, string> = {
    "bg-zinc-900": "#18181B",
    "bg-zinc-950": "#09090B",
    "bg-neutral-950": "#0A0A0A",
    "bg-stone-950": "#0C0A09",
    "bg-slate-900": "#0F172A",
    "bg-slate-50": "#F8FAFC",
    "bg-sky-50": "#F0F9FF",
    "bg-pink-50": "#FDF2F8",
    "bg-indigo-950": "#1E1B4B",
    "bg-violet-950": "#2E1065",
  };
  return colorMap[bgClass] || "#09090B";
}

/**
 * Determines if a background is light.
 */
function isLightBg(bgClass: string): boolean {
  const lightBgs = ["bg-slate-50", "bg-sky-50", "bg-pink-50"];
  return lightBgs.includes(bgClass);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);
  const [activeAlbumId, setActiveAlbumId] = useState<number | null>(null);

  const setTheme = useCallback((newTheme: ThemeConfig) => {
    setThemeState(newTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isLight = isLightBg(theme.bg);

    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-primary-rgb", hexToRgb(theme.primary));
    root.style.setProperty(
      "--theme-accent",
      theme.accent || theme.primary
    );
    root.style.setProperty(
      "--theme-accent-rgb",
      hexToRgb(theme.accent || theme.primary)
    );
    root.style.setProperty("--theme-bg", bgClassToColor(theme.bg));
    root.style.setProperty(
      "--theme-surface",
      isLight ? "#FFFFFF" : "#18181B"
    );
    root.style.setProperty(
      "--theme-surface-hover",
      isLight ? "#F4F4F5" : "#27272A"
    );
    root.style.setProperty(
      "--theme-text",
      isLight ? "#18181B" : "#FAFAFA"
    );
    root.style.setProperty(
      "--theme-text-muted",
      isLight ? "#71717A" : "#A1A1AA"
    );
    root.style.setProperty(
      "--theme-border",
      isLight ? "#E4E4E7" : "#27272A"
    );

    // Map Tailwind font class to actual font-family
    const fontMap: Record<string, string> = {
      "font-sans": '"Inter", sans-serif',
      "font-serif": '"Playfair Display", serif',
      "font-mono": '"JetBrains Mono", monospace',
    };
    root.style.setProperty(
      "--theme-font",
      fontMap[theme.font] || fontMap["font-sans"]
    );
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, activeAlbumId, setActiveAlbumId }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

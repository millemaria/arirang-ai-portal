/**
 * ThemeConfig — Defines the visual theme for an album.
 * Applied dynamically on the frontend via CSS variables.
 */
export interface ThemeConfig {
  /** Tailwind background class (e.g., "bg-slate-50") */
  bg: string;
  /** Primary hex color (e.g., "#1E3A8A") */
  primary: string;
  /** Tailwind font class (e.g., "font-serif") */
  font: string;
  /** Optional accent hex color */
  accent?: string;
}

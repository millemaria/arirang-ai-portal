"use client";

import { Album } from "@/lib/types";
import { useTheme } from "./ThemeProvider";

interface AlbumCardProps {
  album: Album;
  index: number;
}

/**
 * Converts hex to RGB string for CSS custom property.
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124, 58, 237";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export default function AlbumCard({ album, index }: AlbumCardProps) {
  const { setTheme, activeAlbumId, setActiveAlbumId } = useTheme();
  const { themeConfig } = album;
  const isActive = activeAlbumId === album.id;
  const primaryRgb = hexToRgb(themeConfig.primary);

  const handleClick = () => {
    setTheme(themeConfig);
    setActiveAlbumId(album.id);
  };

  const releaseYear = new Date(album.releaseDate).getFullYear();

  // Album type badge styles
  const typeBadgeColors: Record<string, string> = {
    studio: "bg-emerald-500/20 text-emerald-400",
    mini: "bg-blue-500/20 text-blue-400",
    single: "bg-amber-500/20 text-amber-400",
    compilation: "bg-purple-500/20 text-purple-400",
    anthology: "bg-rose-500/20 text-rose-400",
  };

  return (
    <div
      className={`album-card glass-card group flex flex-col items-center text-center ${isActive ? "album-card-active" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${album.title} theme`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      style={
        {
          "--card-primary-rgb": primaryRgb,
          animationDelay: `${index * 0.1}s`,
        } as React.CSSProperties
      }
    >
      {/* Gradient header area (simulates album art) */}
      <div
        className="h-44 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.primary}40, ${themeConfig.accent || themeConfig.primary}20, transparent)`,
        }}
      >
        {/* Era label */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs px-2.5 py-1 rounded-full ${typeBadgeColors[album.albumType] || typeBadgeColors.studio}`}
          >
            {album.albumType.toUpperCase()}
          </span>
        </div>

        {/* Track count */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: `${themeConfig.primary}20`,
              color: themeConfig.primary,
            }}
          >
            {album.trackCount} faixas
          </span>
        </div>

        {/* Large album initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-7xl font-bold opacity-10 select-none"
            style={{ color: themeConfig.primary }}
          >
            {album.title.charAt(0)}
          </span>
        </div>

        {/* Korean title */}
        {album.titleKo && (
          <div className="absolute bottom-3 left-3">
            <span
              className="text-xs opacity-50"
              style={{ color: themeConfig.primary }}
            >
              {album.titleKo}
            </span>
          </div>
        )}

        {/* Active indicator ring */}
        {isActive && (
          <div className="absolute inset-0 border-2 rounded-t-2xl animate-pulse-glow"
            style={{ borderColor: themeConfig.primary }}
          />
        )}
      </div>

      {/* Card body */}
      <div className="p-7 flex flex-col items-center text-center">
        <div className="mb-3">
          <h3
            className="font-bold text-xl leading-snug group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--theme-text)" }}
          >
            {album.title}
          </h3>
          <span
            className="text-sm font-mono mt-1 block"
            style={{ color: themeConfig.primary }}
          >
            {releaseYear}
          </span>
        </div>

        <p
          className="text-xs mb-4 uppercase tracking-[0.2em]"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Era {album.era}
        </p>

        {album.description && (
          <p
            className="text-sm leading-[1.7] line-clamp-3"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {album.description}
          </p>
        )}

        {/* Theme preview bar */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border"
              style={{
                background: themeConfig.primary,
                borderColor: `${themeConfig.primary}60`,
              }}
            />
            {themeConfig.accent && (
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  background: themeConfig.accent,
                  borderColor: `${themeConfig.accent}60`,
                }}
              />
            )}
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {isActive ? "✦ Tema Ativo" : "Clique para aplicar o tema"}
          </span>
        </div>
      </div>
    </div>
  );
}

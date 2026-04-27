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
      {/* Gradient header area (with album art) */}
      <div
        className="h-44 w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.primary}40, ${themeConfig.accent || themeConfig.primary}20, transparent)`,
        }}
      >
        {/* Album Cover Image */}
        {album.coverUrl && (
          <img
            src={album.coverUrl}
            alt={album.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Overlay for better text legibility if needed, plus the existing gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Era label */}
        <div className="absolute top-5 p-3 left-5 z-10">
          <span
            className={`text-xs px-2.5 py-3 rounded-full 
              ${typeBadgeColors[album.albumType] || typeBadgeColors.studio}`}
          >
            {album.albumType.toUpperCase()}
          </span>
        </div>

        {/* Track count */}
        <div className="absolute top-5 right-5 z-10">
          <span
            className="text-xs px-3.5 py-2 rounded-full shadow-lg"
            style={{
              background: `${themeConfig.primary}dd`,
              color: "#fff",
              fontWeight: "bold",
              padding: "5px",
             
            }}
          >
            {album.trackCount} faixas
          </span>
        </div>

        {/* Large album initial (hidden if cover is present) */}
        {!album.coverUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-6xl font-bold opacity-10 select-none"
              style={{ color: themeConfig.primary, marginTop: "3rem" }}
            >
              {album.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Korean title */}
        {album.titleKo && (
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className="text-xs font-bold text-white drop-shadow-md"
            >
              {album.titleKo}
            </span>
          </div>
        )}

        {/* Active indicator ring */}
        {isActive && (
          <div className="absolute inset-0 border-2 rounded-t-2xl animate-pulse-glow z-20"
            style={{ borderColor: themeConfig.primary }}
          />
        )}
      </div>

      {/* Card body */}
      <div className="p-10 sm:p-14 lg:p-16 flex flex-col items-center text-center flex-grow">
        <div className="mb-8 flex flex-col gap-2">
          <h3
            className="font-bold text-xl leading-snug group-hover:opacity-100 transition-opacity "
            style={{ color: "var(--theme-text)", marginTop: "0.3rem", padding: "1rem" }}
          >
            {album.title}
          </h3>
          <span
            className="text-sm font-mono"
            style={{ color: themeConfig.primary }}
          >
            {releaseYear}
          </span>
        </div>

        <p
          className="text-xs mb-8 uppercase tracking-[0.3em] font-medium opacity-70"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Era {album.era}
        </p>

        {album.description && (
          <p
            className="text-sm leading-relaxed line-clamp-3 opacity-90"
            style={{ color: "var(--theme-text-muted)", marginBottom: "1.4rem", marginTop: "1rem" }}
          >
            {album.description}
          </p>
        )}

        {/* Theme preview bar */}
        <div className="mt-12 flex flex-col items-center gap-4">
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

"use client";

import { useEffect, useState, useMemo } from "react";
import { Album } from "@/lib/types";
import AlbumCard from "./AlbumCard";

interface AlbumGridProps {
  albums: Album[];
}

export default function AlbumGrid({ albums }: AlbumGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random stars only on the client
  const stars = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      color: Math.random() > 0.7 ? "var(--theme-primary)" : "white",
    }));
  }, [mounted]);

  return (
    <section id="albums" className="relative w-full py-20 px-4 md:px-20 flex flex-col items-center overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              "--twinkle-duration": `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              opacity: 0.6,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl relative z-10">
        {/* Section header */}
        <div
          className="text-center animate-fade-in-up flex flex-col items-center"
          style={{ paddingBottom: "0rem" }}
        >
          <span
            className="text-sm tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--theme-primary)" }}
          >
            Discografia
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6"
            style={{ color: "var(--theme-text)" }}
          >
            Catálogo de Álbuns
          </h2>
          <p
            className="text-center text-lg max-w-2xl mx-auto leading-relaxed px-4"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Clique em qualquer álbum para transformar o tema visual do portal. Cada álbum possui sua própria estética única. 💜
          </p>
        </div>

        {/* Album grid */}
        <div
          className="flex flex-wrap justify-center gap-10 stagger-children"
          style={{ paddingTop: "6rem" }}
        >
          {albums.map((album, index) => (
            <div key={album.id} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] xl:w-[calc(25%-1.875rem)] min-w-[280px] max-w-[400px]">
              <AlbumCard album={album} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

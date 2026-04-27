"use client";

import { Album } from "@/lib/types";
import AlbumCard from "./AlbumCard";

interface AlbumGridProps {
  albums: Album[];
}

export default function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <section id="albums" className="w-full py-20 px-20 flex flex-col items-center">
      <div className="w-full max-w-7xl">
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
            <div key={album.id} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] xl:w-[calc(25%-1.875rem)] min-w-[280px] max-w-[320px]">
              <AlbumCard album={album} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

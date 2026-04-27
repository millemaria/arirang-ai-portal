import Hero from "@/components/Hero";
import AlbumGrid from "@/components/AlbumGrid";
import CountdownArirang from "@/components/CountdownArirang";
import ChatPanel from "@/components/ChatPanel";
import { Album } from "@/lib/types";

/**
 * Fetch albums on the server side.
 * Falls back to hardcoded data if the backend is unavailable.
 */
async function getAlbums(): Promise<Album[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/albums`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Backend unavailable");
    const json = await res.json();
    return json.data;
  } catch {
    // Fallback albums for when the backend is not running
    return [
      {
        id: 1, title: "2 Cool 4 Skool", titleKo: "2 Cool 4 Skool", era: "Trilogia Escolar",
        releaseDate: "2013-06-13", albumType: "single", coverUrl: "/images/album/2cool4skool.jpg", trackCount: 9,
        description: "Álbum single de estreia do BTS. O single principal 'No More Dream' desafiou as expectativas da sociedade sobre a juventude.",
        themeConfig: { bg: "bg-zinc-900", primary: "#E11D48", font: "font-mono", accent: "#FB7185" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 2, title: "Dark & Wild", titleKo: "다크 앤 와일드", era: "Trilogia Escolar",
        releaseDate: "2014-08-19", albumType: "studio", coverUrl: "/images/album/darkandwild.jpg", trackCount: 14,
        description: "Primeiro álbum de estúdio completo, incluindo 'Danger' e 'War of Hormone'.",
        themeConfig: { bg: "bg-neutral-950", primary: "#DC2626", font: "font-sans", accent: "#F87171" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 3, title: "The Most Beautiful Moment in Life, Pt. 1", titleKo: "화양연화 Pt.1", era: "HYYH",
        releaseDate: "2015-04-29", albumType: "mini", coverUrl: "/images/album/themostbeautifulmomentinlife.jpg", trackCount: 9,
        description: "O início da icônica era HYYH. 'I Need U' rendeu ao BTS sua primeira vitória em programas musicais.",
        themeConfig: { bg: "bg-sky-50", primary: "#0369A1", font: "font-sans", accent: "#38BDF8" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 4, title: "Wings", titleKo: "윙스", era: "Wings",
        releaseDate: "2016-10-10", albumType: "studio", coverUrl: "/images/album/wings.png", trackCount: 15,
        description: "Inspirado em 'Demian' de Hermann Hesse. 'Blood Sweat & Tears' apresentou conceitos voltados para a arte.",
        themeConfig: { bg: "bg-stone-950", primary: "#991B1B", font: "font-serif", accent: "#B91C1C" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 5, title: "Love Yourself: Her", titleKo: "러브 유어셀프 승 '허'", era: "Love Yourself",
        releaseDate: "2017-09-18", albumType: "mini", coverUrl: "/images/album/her.jpg", trackCount: 9,
        description: "O início da trilogia Love Yourself. 'DNA' quebrou recordes no YouTube.",
        themeConfig: { bg: "bg-pink-50", primary: "#EC4899", font: "font-sans", accent: "#F472B6" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 6, title: "Love Yourself: Tear", titleKo: "러브 유어셀프 전 '티어'", era: "Love Yourself",
        releaseDate: "2018-05-18", albumType: "studio", coverUrl: "/images/album/tear.jpg", trackCount: 11,
        description: "Estreou em #1 na Billboard 200 — o primeiro álbum de K-pop a alcançar este feito.",
        themeConfig: { bg: "bg-slate-900", primary: "#3B82F6", font: "font-sans", accent: "#60A5FA" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 7, title: "Love Yourself: Answer", titleKo: "러브 유어셀프 결 '앤서'", era: "Love Yourself",
        releaseDate: "2018-08-24", albumType: "compilation", coverUrl: "/images/album/answer.jpg", trackCount: 25,
        description: "A conclusão da série Love Yourself. 'IDOL' celebrou a identidade coreana.",
        themeConfig: { bg: "bg-violet-950", primary: "#8B5CF6", font: "font-sans", accent: "#A78BFA" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 8, title: "Map of the Soul: 7", titleKo: "맵 오브 더 소울 : 7", era: "Map of the Soul",
        releaseDate: "2020-02-21", albumType: "studio", coverUrl: "/images/album/mapofthsoul7.jpg", trackCount: 20,
        description: "Reflexão sobre 7 anos juntos. Inspirado na psicologia junguiana.",
        themeConfig: { bg: "bg-indigo-950", primary: "#818CF8", font: "font-sans", accent: "#6366F1" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 9, title: "BE", titleKo: "비", era: "BE",
        releaseDate: "2020-11-20", albumType: "studio", coverUrl: "/images/album/be.jpg", trackCount: 8,
        description: "Criado durante a COVID-19. 'Life Goes On' estreou em #1 na Hot 100.",
        themeConfig: { bg: "bg-slate-50", primary: "#1E3A8A", font: "font-serif", accent: "#3B82F6" },
        createdAt: "", updatedAt: "",
      },
      {
        id: 10, title: "Proof", titleKo: "프루프", era: "Proof",
        releaseDate: "2022-06-10", albumType: "anthology", coverUrl: "/images/album/proof.jpg", trackCount: 48,
        description: "Antologia de 3 CDs celebrando o 9º aniversário do BTS. Inclui 'Yet To Come'.",
        themeConfig: { bg: "bg-zinc-900", primary: "#A1A1AA", font: "font-sans", accent: "#D4D4D8" },
        createdAt: "", updatedAt: "",
      },
    ];
  }
}

export default async function Home() {
  const albums = await getAlbums();

  return (
    <main className="min-h-screen w-full flex flex-col items-center pb-20">
      <div className="w-full">
        <Hero />
      </div>

      <div className="w-full">
        <AlbumGrid albums={albums} />
      </div>

      <div className="section-divider w-full max-w-6xl mx-auto opacity-50 my-12" />

      <div className="w-full">
        <CountdownArirang />
      </div>

      <div className="section-divider w-full max-w-6xl mx-auto opacity-50 my-12" />

      <div className="w-full">
        <ChatPanel />
      </div>

      {/* Footer */}
      <footer className="py-12 text-center flex flex-col items-center">
        <div className="section-divider mb-8 w-full max-w-4xl mx-auto" />
        <p
          className="text-sm"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Feito com 💜 por ARMY para ARMY
        </p>
        <p
          className="text-xs mt-2 max-w-lg"
          style={{ color: "var(--theme-text-muted)", opacity: 0.5 }}
        >
          Portal ARMY — Arirang AI Portal • O conteúdo do BTS é propriedade da BIGHIT MUSIC / HYBE
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: "var(--theme-primary)", opacity: 0.6 }}
        >
          보라해 💜 Borahae
        </p>
      </footer>
    </main>
  );
}

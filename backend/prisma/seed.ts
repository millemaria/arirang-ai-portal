import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding ARMY Portal database...\n");

  // ═══════════════════════════════════════════
  // ALBUMS
  // ═══════════════════════════════════════════
  const albums = [
    {
      title: "2 Cool 4 Skool",
      titleKo: "2 Cool 4 Skool",
      era: "Trilogia Escolar",
      releaseDate: new Date("2013-06-13"),
      albumType: "single",
      coverUrl: "/images/album/2cool4skool.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-zinc-900",
        primary: "#E11D48",
        font: "font-mono",
        accent: "#FB7185",
      }),
      trackCount: 9,
      description:
        "Álbum single de estreia do BTS introduzindo o grupo de hip-hop da Big Hit Entertainment. O single principal 'No More Dream' desafiou as expectativas da sociedade sobre a juventude.",
    },
    {
      title: "Dark & Wild",
      titleKo: "다크 앤 와일드",
      era: "Trilogia Escolar",
      releaseDate: new Date("2014-08-19"),
      albumType: "studio",
      coverUrl: "/images/album/darkandwild.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-neutral-950",
        primary: "#DC2626",
        font: "font-sans",
        accent: "#F87171",
      }),
      trackCount: 14,
      description:
        "Primeiro álbum de estúdio completo, incluindo 'Danger' e 'War of Hormone'. Marcou a transição do conceito escolar para temas mais sombrios e maduros.",
    },
    {
      title: "The Most Beautiful Moment in Life, Pt. 1",
      titleKo: "화양연화 Pt.1",
      era: "HYYH",
      releaseDate: new Date("2015-04-29"),
      albumType: "mini",
      coverUrl: "/images/album/themostbeautifulmomentinlife.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-sky-50",
        primary: "#0369A1",
        font: "font-sans",
        accent: "#38BDF8",
      }),
      trackCount: 9,
      description:
        "O início da icônica era 화양연화 (HYYH). 'I Need U' rendeu ao BTS sua primeira vitória em programas musicais e foi um ponto de virada na carreira.",
    },
    {
      title: "Wings",
      titleKo: "윙스",
      era: "Wings",
      releaseDate: new Date("2016-10-10"),
      albumType: "studio",
      coverUrl: "/images/album/wings.png",
      themeConfig: JSON.stringify({
        bg: "bg-stone-950",
        primary: "#991B1B",
        font: "font-serif",
        accent: "#B91C1C",
      }),
      trackCount: 15,
      description:
        "Inspirado em 'Demian' de Hermann Hesse. Cada membro teve uma faixa solo. 'Blood Sweat & Tears' apresentou um conceito sofisticado e voltado para a arte.",
    },
    {
      title: "Love Yourself: Her",
      titleKo: "러브 유어셀프 승 '허'",
      era: "Love Yourself",
      releaseDate: new Date("2017-09-18"),
      albumType: "mini",
      coverUrl: "/images/album/her.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-pink-50",
        primary: "#EC4899",
        font: "font-sans",
        accent: "#F472B6",
      }),
      trackCount: 9,
      description:
        "O início da trilogia Love Yourself. 'DNA' quebrou recordes no YouTube e entrou na Billboard Hot 100, marcando a ascensão do BTS nos EUA.",
    },
    {
      title: "Love Yourself: Tear",
      titleKo: "러브 유어셀프 전 '티어'",
      era: "Love Yourself",
      releaseDate: new Date("2018-05-18"),
      albumType: "studio",
      coverUrl: "/images/album/tear.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-slate-900",
        primary: "#3B82F6",
        font: "font-sans",
        accent: "#60A5FA",
      }),
      trackCount: 11,
      description:
        "Estreou em #1 na Billboard 200 — o primeiro álbum de K-pop a alcançar este feito. 'Fake Love' explorou a dor de emoções fabricadas.",
    },
    {
      title: "Love Yourself: Answer",
      titleKo: "러브 유어셀프 결 '앤서'",
      era: "Love Yourself",
      releaseDate: new Date("2018-08-24"),
      albumType: "compilation",
      coverUrl: "/images/album/answer.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-violet-950",
        primary: "#8B5CF6",
        font: "font-sans",
        accent: "#A78BFA",
      }),
      trackCount: 25,
      description:
        "A conclusão da série Love Yourself. 'IDOL' celebrou a identidade coreana. 'Epiphany' e 'Answer: Love Myself' transmitiram a mensagem da trilogia sobre amor próprio.",
    },
    {
      title: "Map of the Soul: 7",
      titleKo: "맵 오브 더 소울 : 7",
      era: "Map of the Soul",
      releaseDate: new Date("2020-02-21"),
      albumType: "studio",
      coverUrl: "/images/album/mapofthsoul7.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-indigo-950",
        primary: "#818CF8",
        font: "font-sans",
        accent: "#6366F1",
      }),
      trackCount: 20,
      description:
        "Reflexão sobre 7 anos juntos como um grupo. Inspirado na psicologia junguiana. 'ON' apresentou um conceito de banda marcial. Tornou-se o álbum mais vendido na história da Coreia do Sul no lançamento.",
    },
    {
      title: "BE",
      titleKo: "비",
      era: "BE",
      releaseDate: new Date("2020-11-20"),
      albumType: "studio",
      coverUrl: "/images/album/be.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-slate-50",
        primary: "#1E3A8A",
        font: "font-serif",
        accent: "#3B82F6",
      }),
      trackCount: 8,
      description:
        "Criado durante a pandemia da COVID-19 com a contribuição de todos os membros na produção. 'Life Goes On' estreou em #1 na Hot 100. 'Dynamite' foi o primeiro single totalmente em inglês.",
    },
    {
      title: "Proof",
      titleKo: "프루프",
      era: "Proof",
      releaseDate: new Date("2022-06-10"),
      albumType: "anthology",
      coverUrl: "/images/album/proof.jpg",
      themeConfig: JSON.stringify({
        bg: "bg-zinc-900",
        primary: "#A1A1AA",
        font: "font-sans",
        accent: "#D4D4D8",
      }),
      trackCount: 48,
      description:
        "Antologia de 3 CDs celebrando o 9º aniversário do BTS. Inclui sucessos do passado, demos inéditas e novas faixas como 'Yet To Come' — uma carta ao ARMY sobre sua jornada.",
    },
  ];

  for (const album of albums) {
    await prisma.album.upsert({
      where: { id: albums.indexOf(album) + 1 },
      update: album,
      create: album,
    });
  }
  console.log(`✅ Seeded ${albums.length} albums`);

  // ═══════════════════════════════════════════
  // BTS FACTS (for RAG Vector Store)
  // ═══════════════════════════════════════════
  const facts = [
    // --- Members ---
    { category: "member", content: "BTS has 7 members: RM (Kim Namjoon), Jin (Kim Seokjin), SUGA (Min Yoongi), j-hope (Jung Hoseok), Jimin (Park Jimin), V (Kim Taehyung), and Jungkook (Jeon Jungkook).", source: "Official" },
    { category: "member", content: "RM is the leader of BTS and is known for his high IQ of 148. He learned English by watching the TV show 'Friends'.", source: "Interviews" },
    { category: "member", content: "Jin, the eldest member, is known as 'Worldwide Handsome'. He was street-cast by Big Hit Entertainment while he was a university student.", source: "Interviews" },
    { category: "member", content: "SUGA, also known as Agust D for his solo work, was an underground rapper before joining BTS. He is an accomplished producer and songwriter.", source: "Interviews" },
    { category: "member", content: "j-hope was a street dancer before BTS and won a national dance competition. His solo album 'Jack in the Box' explored darker themes.", source: "Interviews" },
    { category: "member", content: "Jimin was a top student at Busan High School of Arts, majoring in contemporary dance. He is known for his powerful performances and emotional vocals.", source: "Interviews" },
    { category: "member", content: "V (Kim Taehyung) was originally a hidden member, only revealed on debut day. He is known for his deep baritone voice and acting roles.", source: "Interviews" },
    { category: "member", content: "Jungkook, the youngest member (maknae), auditioned for Superstar K3 and was recruited by multiple agencies. He chose Big Hit because of RM.", source: "Interviews" },
    // --- History ---
    { category: "history", content: "BTS debuted on June 13, 2013, under Big Hit Entertainment (now HYBE). Their debut song was 'No More Dream' from the album '2 Cool 4 Skool'.", source: "Official" },
    { category: "history", content: "BTS stands for Bangtan Sonyeondan (방탄소년단), meaning 'Bulletproof Boy Scouts'. In 2017, they also adopted the English meaning 'Beyond The Scene'.", source: "Official" },
    { category: "history", content: "BTS nearly disbanded in 2018 but decided to continue after a group discussion. This was revealed during their FESTA dinner in 2022.", source: "FESTA 2022" },
    { category: "history", content: "BTS was the first K-pop act to present at the United Nations General Assembly, delivering speeches in 2018, 2020, and 2021.", source: "UN Records" },
    { category: "history", content: "BTS performed at the Grammy Awards in 2020, 2021, and 2022, and received nominations for Best Pop Duo/Group Performance.", source: "Grammy Awards" },
    // --- Achievements ---
    { category: "achievement", content: "BTS was the first K-pop group to debut at #1 on the Billboard 200 with 'Love Yourself: Tear' in May 2018.", source: "Billboard" },
    { category: "achievement", content: "'Dynamite' (2020) was BTS's first song performed entirely in English and debuted at #1 on the Billboard Hot 100.", source: "Billboard" },
    { category: "achievement", content: "BTS has sold over 40 million albums globally, making them one of the best-selling artists in the world.", source: "IFPI" },
    { category: "achievement", content: "BTS's 'Butter' spent 10 weeks at #1 on the Billboard Hot 100, the longest-running #1 by an Asian act in chart history.", source: "Billboard" },
    { category: "achievement", content: "BTS's online concert 'Bang Bang Con: The Live' in 2020 attracted 756,000 concurrent viewers, setting a world record for a paid virtual concert.", source: "Guinness World Records" },
    { category: "achievement", content: "BTS received the Order of Cultural Merit from South Korea's president in 2018, the youngest recipients ever.", source: "Korean Government" },
    // --- Trivia ---
    { category: "trivia", content: "ARMY stands for 'Adorable Representative M.C. for Youth'. The fandom was officially named on July 9, 2013.", source: "Official" },
    { category: "trivia", content: "BTS's favorite number is 7 — there are 7 members, they debuted in 2013 (1+3+2+0+1+3 = 10, 1+0 = 1... debatable!), and their album 'Map of the Soul: 7' celebrates 7 years together.", source: "Fan Community" },
    { category: "trivia", content: "The BTS Universe (BU) is an interconnected storyline spanning music videos, webtoons, and novels. It follows the fictional lives of the members, starting from 'I Need U'.", source: "Official" },
    { category: "trivia", content: "BTS's lightstick is called 'ARMY Bomb'. It was one of the first to use Bluetooth connectivity for synchronized light shows during concerts.", source: "Official" },
    { category: "trivia", content: "BTS has a tradition called FESTA, celebrated every June to mark their debut anniversary. It includes special content, songs, and a dinner broadcast for ARMY.", source: "Official" },
    { category: "trivia", content: "Run BTS!, their variety show, has been running since 2015 and has produced over 150 episodes of games, challenges, and behind-the-scenes content.", source: "Weverse" },
    { category: "trivia", content: "The 'Borahae' (보라해) phrase meaning 'I purple you' was coined by V during a fan meeting in 2016. Purple is now BTS and ARMY's representative color.", source: "Fan Meeting 2016" },
    { category: "trivia", content: "BTS's song 'Spring Day' is known as the 'zombie song' on Korean charts because it keeps returning to the top of charts years after release, fueled by emotional connection to the Sewol Ferry tragedy.", source: "Melon Charts" },
    { category: "trivia", content: "Each BTS member has a solo project: RM ('Indigo', 'Right Place, Wrong Person'), Jin ('Happy'), SUGA/Agust D ('D-DAY'), j-hope ('Jack in the Box'), Jimin ('FACE', 'MUSE'), V ('Layover'), Jungkook ('Golden').", source: "Official" },
    { category: "trivia", content: "BTS performed 'Dynamite' at the 2020 Grammy Awards from the rooftop of the KINTEX building in South Korea, connecting live to the ceremony in Los Angeles.", source: "Grammy Awards" },
  ];

  for (const fact of facts) {
    await prisma.btsFact.create({ data: fact });
  }
  console.log(`✅ Seeded ${facts.length} BTS facts`);

  console.log("\n🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

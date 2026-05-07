import { getDb } from "../api/queries/connection";
import * as schema from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // ─── 1. 首页 ────────────────────────────────────────────────

  await db.insert(schema.homepageChapters).values([
    { title: "Music", imageUrl: "/images/music-chapter-cover.jpg", sticker: "listen", stickerRotate: 8, path: "/music", orderIndex: 0 },
    { title: "Research", imageUrl: "/images/research-chapter-cover.jpg", sticker: "read", stickerRotate: -6, path: "/research", orderIndex: 1 },
    { title: "Life", imageUrl: "/images/life-chapter-cover.jpg", sticker: "browse", stickerRotate: 4, path: "/life", orderIndex: 2 },
  ]);

  await db.insert(schema.homepageQuotes).values([
    { quoteText: "I can burn my city with the music inside me.", author: "Ella", isActive: 1 },
  ]);

  // ─── 2. Music ───────────────────────────────────────────────

  await db.insert(schema.songs).values([
    { coverImage: "/images/song-1-cover.jpg", title: "Midnight Tea", year: "2024", genre: "Indie Folk", description: "A quiet conversation with insomnia and warm chamomile.", color: "#8B7355", orderIndex: 0 },
    { coverImage: "/images/song-2-cover.jpg", title: "Crumpled Letters", year: "2023", genre: "Bedroom Pop", description: "Unsent messages folded into melodies.", color: "#A0522D", orderIndex: 1 },
    { coverImage: "/images/song-3-cover.jpg", title: "Bloom Anyway", year: "2023", genre: "Dream Pop", description: "Growing through cracks in concrete.", color: "#6B8E6B", orderIndex: 2 },
    { coverImage: "/images/song-4-cover.jpg", title: "Static & Silk", year: "2022", genre: "Electronic Indie", description: "Where analog warmth meets digital noise.", color: "#5D4E6D", orderIndex: 3 },
  ]);

  await db.insert(schema.concertPhotos).values([
    { imageUrl: "/images/concert-upcoming.jpg", orderIndex: 0 },
    { imageUrl: "/images/concert-mem-1.jpg", orderIndex: 1 },
    { imageUrl: "/images/concert-mem-2.jpg", orderIndex: 2 },
    { imageUrl: "/images/concert-mem-3.jpg", orderIndex: 3 },
    { imageUrl: "/images/concert-mem-4.jpg", orderIndex: 4 },
    { imageUrl: "/images/concert-mem-5.jpg", orderIndex: 5 },
  ]);

  await db.insert(schema.behindTheScenes).values([
    { title: "4am Writing Session", description: "Some of the best ideas come when the world is quiet. This is where songs are born — between sips of cold coffee and the glow of a laptop screen at four in the morning. The city sleeps, but the melodies keep coming.", image1: "/images/bts-1.jpg", image2: "/images/bts-1a.jpg", orderIndex: 0 },
    { title: "Microphone Collection", description: "Each microphone has its own personality. The vintage ribbon mic adds warmth to vocals, the condenser captures every breath, and the dynamic mic is perfect for late-night demos when you don't want to wake the neighbors.", image1: "/images/bts-2.jpg", image2: "/images/bts-2a.jpg", orderIndex: 1 },
    { title: "Coffee & Chord Charts", description: "Before any recording session, there's the ritual: brew a pour-over, spread out the chord charts, and let the caffeine do its magic. The handwriting gets messier as the ideas get better.", image1: "/images/bts-3.jpg", image2: "/images/bts-3a.jpg", orderIndex: 2 },
    { title: "Studio Corner", description: "This little corner of my room is where everything happens. Guitars lean against the wall, plants keep me company, and the afternoon light hits just right. It's not a professional studio, but it's mine.", image1: "/images/bts-4.jpg", image2: "/images/bts-4a.jpg", orderIndex: 3 },
    { title: "Lyrics on Napkins", description: "Inspiration never waits for a proper notebook. These scraps of paper — napkins, receipts, the backs of envelopes — hold the rawest, most honest words. Some made it into songs. Some are still waiting.", image1: "/images/bts-5.jpg", image2: "/images/bts-5a.jpg", orderIndex: 4 },
    { title: "First Demo Recording", description: "There's something magical about the first take. It's imperfect, vulnerable, and real. This old tape recorder has captured more honest moments than any polished studio session ever could.", image1: "/images/bts-6.jpg", image2: "/images/bts-6a.jpg", orderIndex: 5 },
  ]);

  await db.insert(schema.thoughts).values([
    { thumbnail: "/images/thought-1.jpg", title: "On Writing Sad Songs When You're Happy", excerpt: "There's a strange comfort in visiting melancholy like a childhood home...", dateMonth: "Dec", dateYear: "2024", orderIndex: 0 },
    { thumbnail: "/images/thought-2.jpg", title: "Why I Record in My Bedroom", excerpt: "Professional studios are beautiful, but there's something about the creak of your own floorboards...", dateMonth: "Oct", dateYear: "2024", orderIndex: 1 },
    { thumbnail: "/images/thought-3.jpg", title: "Covers vs. Originals: A Love Letter to Both", excerpt: "Interpreting someone else's song taught me more about my own voice than I expected...", dateMonth: "Aug", dateYear: "2024", orderIndex: 2 },
  ]);

  // ─── 3. Research ────────────────────────────────────────────

  await db.insert(schema.researchPapers).values([
    { image: "/images/research-2.jpg", title: "Album Cover Semiotics", brief: "A visual analysis of how indie musicians use album artwork to construct identity narratives in digital streaming contexts.", categoryTag: "Visual Studies", orderIndex: 0 },
    { image: "/images/research-1.jpg", title: "Soundscape Cartography", brief: "Mapping urban sonic environments through participatory methods to understand the relationship between place, memory, and auditory experience.", categoryTag: "Sound Studies", orderIndex: 1 },
  ]);

  await db.insert(schema.interactiveInstallations).values([
    { image: "/images/research-3.jpg", title: "Diary as Interface", brief: "Exploring how personal journaling apps can be reimagined as interactive art installations that preserve emotional texture.", categoryTag: "Interactive Media", orderIndex: 0 },
  ]);

  // ─── 4. Life ─────────────────────────────────────────────────

  await db.insert(schema.photos).values([
    { imageUrl: "/images/photo-1.jpg", title: "Golden Hour Walks", caption: "The city changes color at dusk. Every corner becomes a painting when the light hits just right.", aspectRatio: "landscape", orderIndex: 0 },
    { imageUrl: "/images/photo-2.jpg", title: "Sunday Brunch", caption: "Good food, warm light, and nowhere else to be. These are the Sundays I live for.", aspectRatio: "square", orderIndex: 1 },
    { imageUrl: "/images/photo-3.jpg", title: "Blossom Season", caption: "Spring reminds me that everything finds its way back. Even the quietest bloom makes noise.", aspectRatio: "portrait", orderIndex: 2 },
    { imageUrl: "/images/photo-4.jpg", title: "Laughing Loud", caption: "Some moments you don't plan. They just happen, and you're grateful your camera was ready.", aspectRatio: "square", orderIndex: 3 },
    { imageUrl: "/images/photo-5.jpg", title: "City at Dusk", caption: "The sky turns terracotta, and the buildings hold their breath. My favorite hour of the day.", aspectRatio: "landscape", orderIndex: 4 },
    { imageUrl: "/images/photo-6.jpg", title: "Reading Nook", caption: "A blanket, a window, and a pile of books. My definition of a perfect afternoon.", aspectRatio: "landscape", orderIndex: 5 },
    { imageUrl: "/images/photo-7.jpg", title: "On the Road", caption: "Trains and platforms and the feeling of going somewhere. Even the waiting is beautiful.", aspectRatio: "portrait", orderIndex: 6 },
    { imageUrl: "/images/photo-8.jpg", title: "Nap Time", caption: "Cats have mastered the art of doing nothing. I'm still learning, one nap at a time.", aspectRatio: "square", orderIndex: 7 },
    { imageUrl: "/images/photo-9.jpg", title: "Crowd Joy", caption: "Thousands of strangers singing the same words. That's when music feels like home.", aspectRatio: "landscape", orderIndex: 8 },
  ]);

  await db.insert(schema.pets).values([
    { imageUrl: "/images/pet-1.jpg", name: "Mochi", breed: "Orange Tabby", bio: "Professional napper. Loves sunbeams, hates alarm clocks. Has a very specific meow for 'feed me now'.", dateLabel: "Adopted 2022", orderIndex: 0 },
    { imageUrl: "/images/pet-2.jpg", name: "Sesame", breed: "Shiba Inu", bio: "Energy in dog form. Chases squirrels, steals socks, and gives the best welcome-home dances.", dateLabel: "Joined 2023", orderIndex: 1 },
  ]);

  await db.insert(schema.concertMemories).values([
    { imageUrl: "/images/concert-mem-1.jpg", concertDate: "Apr 2025", artist: "Faye Webster", venue: "The Fillmore", memoryQuote: "danced until my shoes hurt", orderIndex: 0 },
    { imageUrl: "/images/concert-mem-2.jpg", concertDate: "Feb 2025", artist: "Japanese Breakfast", venue: "Fox Theater", memoryQuote: "cried during 'Be Sweet'", orderIndex: 1 },
    { imageUrl: "/images/concert-mem-3.jpg", concertDate: "Nov 2024", artist: "Yo La Tengo", venue: "Great American", memoryQuote: "the longest jam session", orderIndex: 2 },
    { imageUrl: "/images/concert-mem-4.jpg", concertDate: "Aug 2024", artist: "Mitski", venue: "Greek Theatre", memoryQuote: "a full moon and perfect setlist", orderIndex: 3 },
    { imageUrl: "/images/concert-mem-5.jpg", concertDate: "May 2024", artist: "Sufjan Stevens", venue: "Berkeley", memoryQuote: "intimate and transcendent", orderIndex: 4 },
    { imageUrl: "/images/concert-mem-6.jpg", concertDate: "Mar 2024", artist: "Phoebe Bridgers", venue: "Golden Gate", memoryQuote: "screamed the lyrics with strangers", orderIndex: 5 },
  ]);

  console.log("Done seeding.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

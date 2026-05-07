import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

// ─── 1. 首页 ──────────────────────────────────────────────────────

export const homepageChapters = mysqlTable("homepage_chapters", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  sticker: varchar("sticker", { length: 50 }),
  stickerRotate: int("sticker_rotate").default(0),
  path: varchar("path", { length: 255 }).notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const homepageQuotes = mysqlTable("homepage_quotes", {
  id: serial("id").primaryKey(),
  quoteText: text("quote_text").notNull(),
  author: varchar("author", { length: 255 }).default("Ella"),
  isActive: int("is_active").default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// ─── 2. Music ─────────────────────────────────────────────────────

export const songs = mysqlTable("songs", {
  id: serial("id").primaryKey(),
  coverImage: varchar("cover_image", { length: 500 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  year: varchar("year", { length: 10 }).notNull(),
  genre: varchar("genre", { length: 255 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 20 }).default("#8B7355"),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const concertPhotos = mysqlTable("concert_photos", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const behindTheScenes = mysqlTable("behind_the_scenes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image1: varchar("image_1", { length: 500 }).notNull(),
  image2: varchar("image_2", { length: 500 }).notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const thoughts = mysqlTable("thoughts", {
  id: serial("id").primaryKey(),
  thumbnail: varchar("thumbnail", { length: 500 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  dateMonth: varchar("date_month", { length: 20 }),
  dateYear: varchar("date_year", { length: 10 }),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// ─── 3. Research ─────────────────────────────────────────────────

export const researchPapers = mysqlTable("research_papers", {
  id: serial("id").primaryKey(),
  image: varchar("image", { length: 500 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  brief: text("brief").notNull(),
  categoryTag: varchar("category_tag", { length: 100 }).notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const interactiveInstallations = mysqlTable("interactive_installations", {
  id: serial("id").primaryKey(),
  image: varchar("image", { length: 500 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  brief: text("brief").notNull(),
  categoryTag: varchar("category_tag", { length: 100 }).notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// ─── 4. Life ──────────────────────────────────────────────────────

export const photos = mysqlTable("photos", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  caption: text("caption"),
  aspectRatio: varchar("aspect_ratio", { length: 20 }).default("square"),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const pets = mysqlTable("pets", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  breed: varchar("breed", { length: 255 }),
  bio: text("bio"),
  dateLabel: varchar("date_label", { length: 255 }),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const concertMemories = mysqlTable("concert_memories", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  concertDate: varchar("concert_date", { length: 50 }).notNull(),
  artist: varchar("artist", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }).notNull(),
  memoryQuote: text("memory_quote").notNull(),
  orderIndex: int("order_index").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

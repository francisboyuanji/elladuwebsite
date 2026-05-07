import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const musicRouter = createRouter({
  getSongs: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.songs).orderBy(schema.songs.orderIndex);
  }),

  getConcertPhotos: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.concertPhotos).orderBy(schema.concertPhotos.orderIndex);
  }),

  getBehindTheScenes: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.behindTheScenes).orderBy(schema.behindTheScenes.orderIndex);
  }),

  getThoughts: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.thoughts).orderBy(schema.thoughts.orderIndex);
  }),

  createSong: publicQuery
    .input(z.object({ coverImage: z.string(), title: z.string(), year: z.string(), genre: z.string(), description: z.string().optional(), color: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.songs).values(input);
      return { success: true };
    }),

  updateSong: publicQuery
    .input(z.object({ id: z.number(), coverImage: z.string().optional(), title: z.string().optional(), year: z.string().optional(), genre: z.string().optional(), description: z.string().optional().nullable(), color: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.songs).set(data).where(eq(schema.songs.id, id));
      return { success: true };
    }),

  deleteSong: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.songs).where(eq(schema.songs.id, input.id));
      return { success: true };
    }),

  createConcertPhoto: publicQuery
    .input(z.object({ imageUrl: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.concertPhotos).values(input);
      return { success: true };
    }),

  deleteConcertPhoto: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.concertPhotos).where(eq(schema.concertPhotos.id, input.id));
      return { success: true };
    }),

  createBts: publicQuery
    .input(z.object({ title: z.string(), description: z.string(), image1: z.string(), image2: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.behindTheScenes).values(input);
      return { success: true };
    }),

  updateBts: publicQuery
    .input(z.object({ id: z.number(), title: z.string().optional(), description: z.string().optional(), image1: z.string().optional(), image2: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.behindTheScenes).set(data).where(eq(schema.behindTheScenes.id, id));
      return { success: true };
    }),

  deleteBts: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.behindTheScenes).where(eq(schema.behindTheScenes.id, input.id));
      return { success: true };
    }),

  createThought: publicQuery
    .input(z.object({ thumbnail: z.string(), title: z.string(), excerpt: z.string(), dateMonth: z.string().optional(), dateYear: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.thoughts).values(input);
      return { success: true };
    }),

  updateThought: publicQuery
    .input(z.object({ id: z.number(), thumbnail: z.string().optional(), title: z.string().optional(), excerpt: z.string().optional(), dateMonth: z.string().optional().nullable(), dateYear: z.string().optional().nullable(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.thoughts).set(data).where(eq(schema.thoughts.id, id));
      return { success: true };
    }),

  deleteThought: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.thoughts).where(eq(schema.thoughts.id, input.id));
      return { success: true };
    }),
});

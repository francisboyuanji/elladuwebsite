import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const homeRouter = createRouter({
  getChapters: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.homepageChapters).orderBy(schema.homepageChapters.orderIndex);
  }),

  getQuote: publicQuery.query(async () => {
    const db = getDb();
    const quotes = await db.select().from(schema.homepageQuotes).where(eq(schema.homepageQuotes.isActive, 1));
    return quotes[0] ?? null;
  }),

  createChapter: publicQuery
    .input(z.object({ title: z.string(), imageUrl: z.string(), sticker: z.string().optional(), stickerRotate: z.number().optional(), path: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.homepageChapters).values(input);
      return { success: true };
    }),

  updateChapter: publicQuery
    .input(z.object({ id: z.number(), title: z.string().optional(), imageUrl: z.string().optional(), sticker: z.string().optional().nullable(), stickerRotate: z.number().optional(), path: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.homepageChapters).set(data).where(eq(schema.homepageChapters.id, id));
      return { success: true };
    }),

  deleteChapter: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.homepageChapters).where(eq(schema.homepageChapters.id, input.id));
      return { success: true };
    }),

  updateQuote: publicQuery
    .input(z.object({ id: z.number(), quoteText: z.string().optional(), author: z.string().optional(), isActive: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.homepageQuotes).set(data).where(eq(schema.homepageQuotes.id, id));
      return { success: true };
    }),
});

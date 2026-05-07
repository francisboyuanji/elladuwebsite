import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const lifeRouter = createRouter({
  getPhotos: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.photos).orderBy(schema.photos.orderIndex);
  }),

  getPets: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.pets).orderBy(schema.pets.orderIndex);
  }),

  getConcertMemories: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.concertMemories).orderBy(schema.concertMemories.orderIndex);
  }),

  createPhoto: publicQuery
    .input(z.object({ imageUrl: z.string(), title: z.string(), caption: z.string().optional(), aspectRatio: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.photos).values(input);
      return { success: true };
    }),

  updatePhoto: publicQuery
    .input(z.object({ id: z.number(), imageUrl: z.string().optional(), title: z.string().optional(), caption: z.string().optional().nullable(), aspectRatio: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.photos).set(data).where(eq(schema.photos.id, id));
      return { success: true };
    }),

  deletePhoto: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.photos).where(eq(schema.photos.id, input.id));
      return { success: true };
    }),

  createPet: publicQuery
    .input(z.object({ imageUrl: z.string(), name: z.string(), breed: z.string().optional(), bio: z.string().optional(), dateLabel: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.pets).values(input);
      return { success: true };
    }),

  updatePet: publicQuery
    .input(z.object({ id: z.number(), imageUrl: z.string().optional(), name: z.string().optional(), breed: z.string().optional().nullable(), bio: z.string().optional().nullable(), dateLabel: z.string().optional().nullable(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.pets).set(data).where(eq(schema.pets.id, id));
      return { success: true };
    }),

  deletePet: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.pets).where(eq(schema.pets.id, input.id));
      return { success: true };
    }),

  createConcertMemory: publicQuery
    .input(z.object({ imageUrl: z.string(), concertDate: z.string(), artist: z.string(), venue: z.string(), memoryQuote: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.concertMemories).values(input);
      return { success: true };
    }),

  updateConcertMemory: publicQuery
    .input(z.object({ id: z.number(), imageUrl: z.string().optional(), concertDate: z.string().optional(), artist: z.string().optional(), venue: z.string().optional(), memoryQuote: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.concertMemories).set(data).where(eq(schema.concertMemories.id, id));
      return { success: true };
    }),

  deleteConcertMemory: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.concertMemories).where(eq(schema.concertMemories.id, input.id));
      return { success: true };
    }),
});

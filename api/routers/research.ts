import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const researchRouter = createRouter({
  getResearchPapers: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.researchPapers).orderBy(schema.researchPapers.orderIndex);
  }),

  getInteractiveInstallations: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.interactiveInstallations).orderBy(schema.interactiveInstallations.orderIndex);
  }),

  createPaper: publicQuery
    .input(z.object({ image: z.string(), title: z.string(), brief: z.string(), categoryTag: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.researchPapers).values(input);
      return { success: true };
    }),

  updatePaper: publicQuery
    .input(z.object({ id: z.number(), image: z.string().optional(), title: z.string().optional(), brief: z.string().optional(), categoryTag: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.researchPapers).set(data).where(eq(schema.researchPapers.id, id));
      return { success: true };
    }),

  deletePaper: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.researchPapers).where(eq(schema.researchPapers.id, input.id));
      return { success: true };
    }),

  createInstallation: publicQuery
    .input(z.object({ image: z.string(), title: z.string(), brief: z.string(), categoryTag: z.string(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(schema.interactiveInstallations).values(input);
      return { success: true };
    }),

  updateInstallation: publicQuery
    .input(z.object({ id: z.number(), image: z.string().optional(), title: z.string().optional(), brief: z.string().optional(), categoryTag: z.string().optional(), orderIndex: z.number().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(schema.interactiveInstallations).set(data).where(eq(schema.interactiveInstallations.id, id));
      return { success: true };
    }),

  deleteInstallation: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.interactiveInstallations).where(eq(schema.interactiveInstallations.id, input.id));
      return { success: true };
    }),
});

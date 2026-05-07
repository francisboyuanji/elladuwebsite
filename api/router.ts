import { createRouter, publicQuery } from "./middleware";
import { homeRouter } from "./routers/home";
import { musicRouter } from "./routers/music";
import { researchRouter } from "./routers/research";
import { lifeRouter } from "./routers/life";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  home: homeRouter,
  music: musicRouter,
  research: researchRouter,
  life: lifeRouter,
});

export type AppRouter = typeof appRouter;

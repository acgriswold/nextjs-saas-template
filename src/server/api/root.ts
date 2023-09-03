import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "~/server/api/routers/project";
import { appointmentRouter } from "./routers/appointment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectRouter,
  appointment: appointmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

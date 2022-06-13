import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { bookRouter } from "./book";

export const appRouter = createRouter().merge("book.", bookRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async () => null,
});
